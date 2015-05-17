"use strict";
/* global describe, before, it, expect */

describe('Users module', function(){

    var Client  = new app.dao.client()
    ,   User    = app.db.User
    ,   Dao     = new app.dao.user()
    ,   sha1    = app.utils.sha1;

    describe('DAO level', function(){
        before(function(done){ User.collection.remove(done); });

        it('Creates an user', function(){
            return Dao.create({
                username: "booler",
                email: "booler@boolinc.co",
                password: sha1("b00l3r"),
                name: {
                    first: "Another",
                    middle: "Other",
                    last: "Booler"
                },
                birthday: new Date("1994-05-07")
            });
        });
    });

    describe('Controller level', function(){
    });

});
