"use strict";

module.exports = function (Schema) {

    var Q = app.utils.q;

    var ExperienceSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        data: {
            type: Date,
            required: true
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    });

    ExperienceSchema.statics.list = function(query, fields, Experienceion){
        return Q.nbind(this.find, this)(query, fields, Experienceion);
    };

    ExperienceSchema.statics.findById = function(id){
        return Q.nbind(this.findOne, this)({ _id: id });
    };

    ExperienceSchema.statics.insert = function(Experience){
        return Q.nbind(this.create, this)(Experience);
    };

    ExperienceSchema.statics.update = function(id, data){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(exp){
            for(var d in data){ if(exp[d]) exp[d] = data[d]; }
            return Q.nbind(exp.save, exp)();
        }).then(function(data){
            return data[0];
        });
    };

    ExperienceSchema.statics.delete = function(id){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(exp){
            return Q.nbind(exp.remove, exp)();
        });
    };

    return ExperienceSchema;

};
