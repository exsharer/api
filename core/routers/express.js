"use strict";

module.exports = function(express){

    var passport = app.utils.passport,
        approutes = app.routes;

    require('./middleware')(express);

    var router = app.router,
        cors = app.utils.cors;

    router.get('/', function(req, res){
        res.status(200);
        res.end();
    });

    var nextMiddleware = function(req, res, next){
        next();
    };

    for(module in approutes){

        var module = new approutes[module]();

        for(var route in module){
            var rt = module[route];

            if(rt.cors){
                cors.registerRoute(rt.url, rt.method);
            }

            var bearerMiddleware = (
                rt.public && nextMiddleware || passport.authenticate('bearer')
            );

            router[rt.method](rt.url,
                bearerMiddleware,
                rt.action
            );

        }

    }

    app.router = router;

};
