"use strict";

module.exports = (function() {

    var nodemailer = require('nodemailer');

    var transporter = null;

    return {

        setTransporter: function(config){
            transporter = nodemailer.createTransport(config);
        },

        send: function(options, cb){
            if(transporter) transporter.sendMail(options, cb);
            else throw {message: "Missing transporter for mail function"};
        }

    };

})();
