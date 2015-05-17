"use strict";

module.exports = function(){

    var dao     = new app.dao.project()
    ,   resolve = new app.views.json().promise;

    return {
        list: function (req, res, next) {
            var input = app.utils.mongoose.query(req.query);

            resolve(
                dao.list(input.query, input.fields, input.projection),
                res, next
            );
        },
        find: function(req, res, next){
            resolve(dao.find(req.params.id), res, next);
        },
        create: function(req, res, next){
            resolve(dao.create(req.body), res, next);
        },
        update: function(req, res, next){
            var q   = req.query
            ,   id  = req.params.id;

            resolve((
                q.proposal !== undefined && dao.addProposal(id, q.proposal) ||
                q.question !== undefined && dao.addQuestion(id, q.question) ||
                dao.update(id, req.body)
            ), res, next);
        },
        delete: function(req, res, next){
            resolve(dao.delete(req.params.id), res, next);
        }
    };

};
