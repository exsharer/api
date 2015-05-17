'use strict';

module.exports = function(){

    var User = app.db.User;

    return {
        list: function(query, fields, projection){
            return User.list(query, fields, projection);
        },
        find: function(id, username){
            return (username != undefined ?
                User.findByUsername(username) :
                User.findById(id)
            );
        },
        login: function (username, password) {
            return User.findByUsername(username).then(function(user){
                return user.login(password);
            }).then(function(){
                if(matches) return user;
                else throw new InvalidPasswordError();
            });
        }
        create: function(user){
            return User.insert(user);
        },
        update: function(id, user){
            return User.update(id, user);
        },
        delete: function(id){
            return User.delete(id);
        }
    };

};
