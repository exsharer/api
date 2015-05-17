"use strict";
/* global describe, before, it, expect */

describe('Users module', function(){

    var Client  = new app.dao.client()
    ,   User    = app.db.User
    ,   Dao     = app.dao.user;

    describe('DAO level', function(){
        before(function(done){ User.collection.remove(done); });
    });

    describe('Controller level', function(){
    });

});
