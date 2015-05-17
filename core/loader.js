var q               = require('q')
,   _               = require('underscore')
,   fs              = require('fs')
,   util            = require('util')
,   crypto          = require('crypto')
,   bcrypt          = require('bcryptjs')

,   log             = require("../utils/log")
,   cors            = require("../utils/cors")
,   hotp            = require('../utils/hotp')
,   token           = require('../utils/token')
,   formidable      = require('../utils/formidable')
,   checkFields     = require("../utils/checkFields")
,   objectInjector  = require('../utils/object-injector')

,   mongo_query     = require('../utils/mongo-query')
,   geojson         = require('mongoose-geojson-schema')
,   private_paths   = require('mongoose-private-paths')
,   express         = require('express')
,   jsonfile        = require('jsonfile')
,   passport        = require('passport')
,   oauth2orize     = require('oauth2orize');


var utils = {

    _: _,
    q: q,
    log: log,
    util: util,
    crypto: crypto,
    bcrypt: bcrypt,

    cors: cors,
    hotp: hotp,

    token: token,
    formidable: formidable,
    checkFields: checkFields,
    objectInjector: objectInjector,

    mongoose: {
        private: private_paths,
        geo: geojson,
        query: mongo_query
    },

    passport: passport,
    oauth2orize: oauth2orize

};

function loadComponents(componentName){

    var component = {};

    try{

        var files = fs.readdirSync(componentName, { followLinks: false });

        for(file in files){

            var filename = files[file].split(".");
            var comp = filename[0];
            var ext = filename[1];

            if(ext != 'js'){
                continue;
            }

            var route = util.format("../%s/%s", componentName, comp);

            if(process.env.NODE_ENV == 'development')
            log.info("Loading %s.%s", route, ext);

            var exported = require(route);

            var object = _.object([[comp, exported]])
            component = _.extend(component, object);
        }

        return component;

    } catch(err){

        if(process.env.NODE_ENV == "development")
        log.error("Couldn't load components from %s", componentName);

    }

}

function loadConfigs(){

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    var componentName = 'config';

    var component = {};

    var files = fs.readdirSync(componentName, { followLinks: false });

    for(file in files){

        var filename = files[file].split(".");
        var comp = filename[0];
        var ext = filename[1];

        if(ext != 'json'){
            continue;
        }

        var route = util.format("%s/%s.%s", componentName, comp, ext);

        if(process.env.NODE_ENV == 'development')
        log.info("Loading %s", route);

        var exported = jsonfile.readFileSync(route);

        var object = _.object([[comp, exported]])
        component = _.extend(component, object);
    }

    return component;

}

module.exports = (function(){

    var loaders = [
        'dao', 'plugins', 'controllers', 'routes', 'security', 'views'
    ];

    global.app = {
        utils: utils,
        express: express
    };

    /* */
    app.config = loadConfigs();
    require('./error')();
    require("./database")();
    /* */

    for(loader in loaders){

        loader = loaders[loader];
        var obj = loadComponents(loader);

        var ns = _.object([[loader, obj]]);
        app = _.extend(app, ns);

    }

    return app;

})();
