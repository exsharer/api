"use strict";

module.exports = function(){

    var router  = app.router
    ,   log     = app.utils.log
    ,   json    = new app.views.json();

    // 404 Middleware: Final Middleware matches routes that aren't registered
    router.use(function(req, res) {
        res.status(404);
        json.error({ "message": "Method not found" }, res);
    });

    // Error Middleware: Matches Server Error Routes
    router.use(function(err, req, res, next){
        json.error(err, res);
    });

    app.router = router;
    return app;

};
