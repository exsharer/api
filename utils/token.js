"use strict";

module.exports = function(size){

    var crypto = require('crypto');

    return crypto.createHmac('sha512', new Date().toString()).update(
        crypto.randomBytes(size)
    ).digest('base64');

};
