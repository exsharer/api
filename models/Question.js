"use strict";

module.exports = function (Schema) {

    var Q = app.utils.q;

    var QuestionSchema = new Schema({
        _parent: {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        },
        title: {
            type: String
        },
        description: {
            type: String,
            required: true
        }
    });

    QuestionSchema.statics.list = function(query, fields, projection){
        return Q.nbind(this.find, this)(query, fields, projection);
    };

    QuestionSchema.statics.findById = function(id){
        return Q.nbind(this.findOne, this)({ _id: id });
    };

    QuestionSchema.statics.insert = function(proposal){
        return Q.nbind(this.create, this)(proposal);
    };

    QuestionSchema.statics.update = function(id, data){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(question){
            for(var d in data){ if(question[d]) question[d] = data[d]; }
            return Q.nbind(question.save, question)();
        }).then(function(data){
            return data[0];
        });
    };

    QuestionSchema.statics.delete = function(id){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(question){
            return Q.nbind(question.remove, question)();
        });
    };

    return QuestionSchema;

};
