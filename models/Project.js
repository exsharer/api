"use strict";

module.exports = function (Schema, mongoose) {

    var _   = app.utils._
    ,   Q   = app.utils.q
    ,   log = app.utils.log
    ,   Geo = app.utils.mongoose.geo;

    var ProjectSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        place: Geo.Point,
        status: {
            type: String,
            enum: [
                "planning",
                "progress",
                "finished"
            ],
            required: true,
            default: "planning"
        },
        photo: {
            type: String
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    });

    ProjectSchema.statics.list = function(query, fields, projection){
        return Q.nbind(this.find, this)(query, fields, projection);
    };

    ProjectSchema.statics.findById = function(id){
        return Q.nbind(this.findOne, this)({ _id: id });
    };

    ProjectSchema.statics.insert = function(project){
        return Q.nbind(this.create, this)(project);
    };

    ProjectSchema.statics.update = function(id, data){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(client){
            for(var d in data){ if(client[d]) client[d] = data[d]; }
            return Q.nbind(client.save, client)();
        }).then(function(data){
            return data[0];
        });
    };

    ProjectSchema.statics.delete = function(id){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(client){
            return Q.nbind(client.remove, client)();
        });
    };

    return ProjectSchema;

}
