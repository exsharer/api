"use strict";

module.exports = function(){

    var Client = app.db.Client;

    return {
        list: function(query, fields, projection){
            return Client.list(query, fields, projection);
        },
        create: function(client){
            return Client.insert(client);
        },
        find: function(id, secret){
            return (secret === undefined ?
                Client.findById(id) :
                Client.findByCId(id, secret)
            );
        },
        update: function(id, client){
            return Client.update(id, client);
        },
        delete: function(id){
            return Client.delete(id);
        }
    };

};
