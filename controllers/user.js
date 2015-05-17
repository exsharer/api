module.exports = function(){

    var json = new app.views.json();

    return {
        me: function(req, res, next){
            json.standard(req.user, res);
        }
    };

};
