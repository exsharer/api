"use strict";

var Token   = app.dao.token
,   User    = app.dao.user;

// Create OAuth 2.0 Authorization Server
var oauth2orize = app.utils.oauth2orize
,   passport    = app.utils.passport
,   server      = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(
    function(client, username, password, scope, done) {

        var user    = new User()
        ,   token   = new Token();

        user.login(username, password).then(function(user){
            return user ? token.create(user._id, client._id) : false;
        }).then(function(token){
            done(null, token.access || false, token.refresh);
        }).catch(done);

    }
));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(
    function(client, refreshToken, scope, done) {

        var token = new Token();

        token.refresh(refreshToken).then(function(data){
            if(!data) return done(null, false);
            return token.create(data.user, data.client);
        }).catch(done);

    }
));

// Token authorization server endpoint
module.exports = [
    passport.authenticate(['oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];
