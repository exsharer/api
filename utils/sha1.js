"use strict";

var crypto = require('crypto');

module.exports = function sha1sum(input){
    return crypto.createHash('sha1').update(input.toString()).digest('hex');
};
