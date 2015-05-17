'use strict';

var Q       = require('q')
,   app     = require('..')
,   log     = require('./log')
,   sha1    = require('./sha1')
,   prompt  = require('prompt')
,   json    = require('jsonfile')
,   User    = app.dao.user;

var mailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

var user    = new User()
,   read    = Q.nbind(prompt.get, prompt);

prompt.message = "";
prompt.delimiter = "";
prompt.start();

var schema = {
    properties: {
        username: {
            description: "Enter username",
            type: 'string',
            message: "You must insert an username",
            require: true
        },
        email: {
            description: "Enter email",
            type: 'string',
            pattern: mailRegex,
            message: "You must insert a valid email",
            require: true
        },
        password: {
            description: "Enter password",
            type: 'string',
            hidden: true,
            message: "You must insert a password",
            require: true,
            before: function (value) { return sha1(value); }
        },
        first_name: {
            description: "Enter first name",
            type: 'string',
            message: "You must insert the user's first name",
            require: true
        },
        middle_name: {
            description: "Enter middle name",
            type: 'string',
            require: false
        },
        last_name: {
            description: "Enter last name",
            type: 'string',
            message: "You must insert the user's last name",
            require: true
        },
        birthday: {
            description: "Enter birthday (yyyy-mm-dd)",
            type: 'string',
            message: "You must insert a valid birthday",
            require: true
        }
    }
};

read(schema).then(function(result){
    return user.create({
        username: result.username,
        email: result.email,
        name: {
            first: result.first_name,
            middle: result.middle_name,
            last: result.last_name
        },
        password: result.password,
        birthday: new Date(result.birthday)
    });
}).then(function(result){
    console.log("User has been created\n%j", result);
    return json.writeFileSync('user.json', result);
}, function(err){
    log.error("Couldn't create client: %s", err.message, err.stack);
}).then(function(){
    process.exit();
    return;
}).done();
