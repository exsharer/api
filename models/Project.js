"use strict";

module.exports = function (Schema) {

    var Q   = app.utils.q
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
        ],
        proposals: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Proposal'
            }
        ],
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Question'
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
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(project){
            for(var d in data){ if(project[d]) project[d] = data[d]; }
            return Q.nbind(project.save, project)();
        }).then(function(data){
            return data[0];
        });
    };

    ProjectSchema.statics.delete = function(id){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(project){
            return Q.nbind(project.remove, project)();
        });
    };

    return ProjectSchema;

};
