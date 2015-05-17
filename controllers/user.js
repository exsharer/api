module.exports = function(){

    var dao     = new app.dao.user()
    ,   json    = new app.views.json()
    ,   query   = app.utils.mongoose.query;

    return {
        list: function (req, res, next) {
            var input = query(req.query);

            return dao.list(
                input.query, input.fields, input.projection
            ).then(function(data){
                json.standard(data, res);
            }).catch(next);
        },
        me: function(req, res, next){
            json.standard(req.user, res);
        },
        create: function(req, res, next){
            dao.create(req.body).then(function(data){
                json.standard(data, res);
            }).catch(next);
        }
    };

};
