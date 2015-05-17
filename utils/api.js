'use strict';

module.exports = function(endpoint, client, OAuthPath){

    var Q           = require('q')
    ,   _           = require('underscore')
    ,   url         = require('url')
    ,   format      = require('./string-replacer')
    ,   request     = require('request');

    var _endpoint   = endpoint
    ,   _client     = client
    ,   _auth       = null;

    this.OAuth = function(grant_type, credentials){
        var defer   = Q.defer()
        ,   api     = this;

        var oauth = (
            (
                grant_type == "password" &&
                {
                    username: credentials && credentials.username || undefined,
                    password: credentials && credentials.password || undefined
                }
            ) ||
            (
                grant_type == "refresh_token" &&
                {
                    refresh_token: credentials && credentials.refresh_token
                }
            ) || undefined
        );

        if(!oauth) throw new BoolError(403, "invalid_credentials");

        oauth.grant_type    = grant_type;
        oauth.client_id     = _client.id;
        oauth.client_secret = _client.secret;

        var route = _.extend(_endpoint, { pathname: OAuthPath });

        request.post({
            url: url.format(route),
            form: oauth
        }, function(err, res, body){
            if(err) return defer.reject(err);

            if(res.statusCode == 200){
                try{
                    var token = JSON.parse(body);
                    api.setAuth(token.token_type, token.access_token);
                    defer.resolve(token);
                } catch(e){
                    defer.reject(e);
                }
            } else {
                defer.reject(new BoolError(
                    res.statusCode,
                    res.error,
                    res.error_description
                ));
            }

        });

        return defer.promise;
    };

    this.setAuth = function(type, token){
        _auth = {
            type: type,
            token: token
        };
        return this;
    };

    this.registerRoute = function(name, method, path){

        if(!(method && _.contains(['get', 'post', 'put', 'delete'], method)))
        throw new BoolError(400, "invalid_method");

        Object.defineProperty(this, name, {
            value: function(params, query, body, type, form){
                var defer = Q.defer();

                var route = url.format(
                    _.extend(_endpoint, {
                        pathname: format(path, /:(\w+)/g, params)
                    })
                );

                var parameters              = {};
                if (query) parameters.qs    = query;
                if (body) parameters.body   = body;
                if (form) parameters.form   = form;
                if(parameters.body || parameters.form) parameters.headers = {
                    'Content-Type': (
                        form && 'application/x-www-form-urlencoded' ||
                        type ||
                        'application/json'
                    )
                };
                else parameters.headers = {};
                if(_auth) parameters.headers.Authorization = format(
                    ":type :token", /:(\w+)/g, _auth
                );

                request[method](route, parameters, function(err, res, body){
                    if(err) return defer.reject(err);

                    if(res.statusCode == 200){
                        try {
                            defer.resolve(JSON.parse(body));
                        } catch(err){
                            defer.reject(err);
                        }
                    } else {
                        defer.reject(new BoolError(
                            res.statusCode,
                            res.error,
                            res.error_description
                        ));
                    }

                });

                return defer.promise;
            },
            configurable: false
        });

        return this;
    };

};
