"use strict";

var fs = require('fs')
,   mongoose = require('mongoose');

function loadModels(Schema){

    var log = app.utils.log,
        util = app.utils.util;

    var files = fs.readdirSync('models', { followLinks: false });

    for(var file in files){

        var filename = files[file].split(".");
        var comp = filename[0];
        var ext = filename[1];

        if(ext != 'js'){
            continue;
        }

        var route = util.format("../%s/%s", 'models', comp);
        if(process.env.NODE_ENV == 'development'){
            log.info("Loading model %s.%s", route, ext);
        }

        var exported = require(route)(Schema, mongoose);
        app.db[comp] = mongoose.model(comp, exported);

    }

}

module.exports = function(){

    var dbconfig = app.config.db[process.env.NODE_ENV]
    ,   util = app.utils.util
    ,   _ = app.utils._;

    app.db = {};
    loadModels(mongoose.Schema);
    mongoose.connect(
        util.format(
            'mongodb://%s%s/%s', dbconfig.host, (dbconfig.port ?
                ":" + dbconfig.port : ""
            ), dbconfig.db
        ),
        _.omit(dbconfig, ['host', 'port', 'db'])
    );

};
