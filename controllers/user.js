"use strict";

module.exports = function(){

    var dao     = new app.dao.user()
    ,   json    = new app.views.json();

    return {
        list: function (req, res, next) {
            var i = app.utils.mongoose.query(req.query);
            json.promise(dao.list(i.query, i.fields, i.projection), res, next);
        },
        find: {
            id: function (req, res, next) {
                json.promise(dao.find(req.params.id), res, next);
            },
            me: function(req, res){
                json.standard(req.user, res);
            }
        },
        create: function(req, res, next){
            json.promise(dao.create(req.body), res, next);
        },
        update: {
            id: function(req, res, next){
                json.promise(dao.update(req.params.id, req.body), res, next);
            },
            me: function(req, res, next){
                json.promise(dao.update(req.user._id, req.body), res, next);
            }
        },
        delete: {
            id: function(req, res, next){
                json.promise(dao.delete(req.params.id), res, next);
            },
            me: function (req, res, next) {
                json.promise(dao.delete(req.user._id), res, next);
            }
        }
    };

};
