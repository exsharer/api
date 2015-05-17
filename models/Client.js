'use strict';

module.exports = function(Schema, mongoose){

    var Q       = app.utils.q
    ,   token   = app.utils.token;

    Q.longStackSupport = true;

    var ClientSchema = new Schema({
        id: {
            type: String,
            unique: true,
            required: true,
            default: token(16)
        },
        name: {
            type: String,
            required: true
        },
        description: String,
        secret: {
            type: String,
            unique: true,
            required: true,
            default: token(32)
        },
        created: {
            type: Date,
            required: true,
            default: Date.now
        }
    });

    ClientSchema.statics.list = function(query, fields, projection){
        return Q.nbind(this.find, this)(query, fields, projection);
    };

    ClientSchema.statics.findById = function(id){
        return Q.nbind(this.findOne, this)({ _id: id });
    };

    ClientSchema.statics.findByCId = function(id, secret){
        return Q.nbind(this.findOne, this)({ id: id, secret: secret });
    };

    ClientSchema.statics.insert = function(client){
        return Q.nbind(this.create, this)(client);
    };

    ClientSchema.statics.update = function(id, data){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(client){
            for(var d in data){ if(client[d]) client[d] = data[d]; }
            return Q.nbind(client.save, client)();
        }).then(function(data){
            return data[0];
        });
    };

    ClientSchema.statics.delete = function(id){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(client){
            return Q.nbind(client.remove, client)();
        });
    };

    return ClientSchema;

};
