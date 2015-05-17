"use strict";

module.exports = function(){

    var dao     = new app.dao.proposal()
    ,   json    = new app.views.json()
    ,   query   = app.utils.mongoose.query;

    return {
        list: function (req, res, next) {
            var input = query(req.query);

            dao.list(
                input.query, input.fields, input.projection
            ).then(function(data){
                json.standard(data, res);
            }).catch(next);
        },
        find: function(req, res, next){
            dao.find(req.params.id).then(function(data){
                json.standard(data, res);
            }).catch(next);
        },
        create: function(req, res, next){
            dao.create(req.body).then(function(data){
                json.standard(data, res);
            }).catch(next);
        },
        update: function(req, res, next){
            dao.update(req.params.id, req.body).then(function(data){
                json.standard(data, res);
            }).catch(next);
        },
        delete: function(req, res, next){
            dao.delete(req.params.id).then(function(){
                json.standard(false, res);
            }).catch(next);
        }
    };

};
