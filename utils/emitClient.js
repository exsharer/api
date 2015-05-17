'use strict';
/* global -app */

var Q       = require('q')
,   app     = require('..')
,   log     = require('./log')
,   prompt  = require('prompt')
,   json    = require('jsonfile')
,   Client  = app.dao.client;

var client  = new Client()
,   read    = Q.nbind(prompt.get, prompt);

prompt.message = "";
prompt.delimiter = "";
prompt.start();

var schema = {
    properties: {
        name: {
            description: "Enter client's name",
            type: 'string',
            message: "You must insert a valid name for the client",
            require: true
        },
        description: {
            description: "Enter client's description",
            type: 'string',
            require: false
        }
    }
};

read(schema).then(function(result){
    return client.create(result);
}).then(function(result){
    console.log(
        "Client credentials\n" +
        "\tID: %s\n" +
        "\tName: %s\n" +
        "\tDescription: %s\n" +
        "\tSecret: %s",
        result.id,
        result.name,
        result.description,
        result.secret
    );
    json.writeFileSync('client.json', result);
    return;
}, function(err){
    log.error("Couldn't create client: %s", err.message);
}).then(function(){
    process.exit();
    return;
}).done();
