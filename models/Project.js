"use strict";

module.exports = function (Schema, mongoose) {

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
        experiences: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Experience'
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
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(Experience){
            for(var d in data){ if(Experience[d]) Experience[d] = data[d]; }
            return Q.nbind(Experience.save, Experience)();
        }).then(function(data){
            return data[0];
        });
    };

    ProjectSchema.statics.addExperience = function(id, experienceId) {
        var Experience  = mongoose.models.Experience
        ,   Project     = mongoose.models.Project
        ,   _experience;
        return Experience.findById(experienceId).then(function(experience){
            _experience = experience;
            return Project.findById(id);
        }).then(function(project){
            project.experiences.push(_experience);
            return Q.nbind(project.save, project)();
        });
    };

    ProjectSchema.statics.delete = function(id){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(project){
            return Q.nbind(project.remove, project)();
        });
    };

    return ProjectSchema;

};
