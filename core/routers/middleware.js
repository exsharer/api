"use strict";

module.exports = function(express){

    var cors = app.utils.cors,
        router = express.Router(),
        log = app.utils.log;

    // CORS Middleware: Match URL Route and HTTP Method with CORS enabled.
    router.options('*', cors.matchUrl, function(req, res){
        res.json(200, {});
    });
    router.use(cors.match);

    // Log Middleware: Log Client Requests
    router.use(function(req, res, next) {
        if(process.env.NODE_ENV != "test") log.info(req.method, req.path);
        next();
    });

    app.router = router;
    app.utils.cors = cors;

};
