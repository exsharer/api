"use strict";

module.exports = function(){

    var dao     = new app.dao.project()
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
        create: function(req, res, next){
            dao.create(req.body).then(function(data){
                json.standard(data, res);
            }).catch(next);
        }
    };

};
