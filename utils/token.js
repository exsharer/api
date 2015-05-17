"use strict";

module.exports = function(size){

    var crypto = require('crypto');

    return crypto.createHash('sha512').update(
        crypto.randomBytes(size)
    ).digest('base64');

};
