'use strict';

module.exports = function(){

    var Token = app.db.Token;

    return {
        find: function(user, client){
            return Token.token(user, client);
        },
        user: function(access){
            return Token.user(access);
        },
        create: function(user, client){
            return Token.insert(user, client);
        },
        refresh: function(refresh){
            return Client.refresh(refresh);
        }
    };

};
