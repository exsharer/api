"use strict";

var Hashids = require('hashids')
,   speakeasy = require('speakeasy');

module.exports = function(salt, cter){
    return speakeasy.hotp({
        key: new Hashids(salt).encode(parseInt(cter, 16)),
        counter: parseInt(cter, 16)
    });
};
