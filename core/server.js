"use strict";

var bodyParser = require('body-parser');

module.exports = function(){

    var srv = app.express();

    srv.use(function(req, res, next){
        res.header(
            "X-Powered-By", "Bool Inc. PLAeX MVC Framework v1.0.1" +
            "Bool.js v0.0.0"
        );
        next();
    });
    srv.set('host', process.env.IP || process.env.HOSTNAME || '0.0.0.0');
    srv.set('port', process.env.PORT || 3006);

    srv.use(bodyParser.urlencoded({extended: true}));
    srv.use(bodyParser.json());

    srv.use(app.utils.passport.initialize());

    require('./router')(app.express);
    srv.use(app.router);

    return srv;

};
