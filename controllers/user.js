"use strict";

module.exports = function(){

    var dao     = new app.dao.user()
    ,   json    = new app.views.json()
    ,   query   = app.utils.mongoose.query;

    var update = function(id,  data, res, next){
        return dao.update(id, data).then(function(data){
            json.standard(data, res);
        }).catch(next);
    };

    var remove = function(id, res, next){
        dao.delete(id).then(function(){
            json.standard(false, res);
        }).catch(next);
    };

    return {
        list: function (req, res, next) {
            var input = query(req.query);

            dao.list(
                input.query, input.fields, input.projection
            ).then(function(data){
                json.standard(data, res);
            }).catch(next);
        },
        find: {
            id: function (req, res, next) {
                dao.find(req.params.id).then(function(data){
                    json.standard(data, res);
                }).catch(next);
            },
            me: function(req, res){
                json.standard(req.user, res);
            }
        },
        create: function(req, res, next){
            dao.create(req.body).then(function(data){
                json.standard(data, res);
            }).catch(next);
        },
        update: {
            id: function(req, res, next){
                update(req.params.id, req.body, res, next);
            },
            me: function(req, res, next){
                update(req.user._id, req.body, res, next);
            }
        },
        delete: {
            id: function(req, res, next){
                remove(req.params.id, res, next);
            },
            me: function (req, res, next) {
                remove(req.user._id, res, next);
            }
        }
    };

};
