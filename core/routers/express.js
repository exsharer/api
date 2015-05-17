module.exports = function(express){

    var log = app.utils.log,
        passport = app.utils.passport,

        approutes = app.routes;

    require('./middleware')(express);

    var router = app.router,
        cors = app.utils.cors;

    router.get('/', function(req, res){
        res.status(200);
        res.end();
    });

    for(module in approutes){

        var module = new approutes[module]();

        for(route in module){
            var rt = module[route];

            if(rt.cors){
                cors.registerRoute(rt.url, rt.method);
            }

            router[rt.method](rt.url,
                passport.authenticate('bearer'),
                rt.action
            );

        }

    }

    app.router = router;

};
