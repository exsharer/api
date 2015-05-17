"use strict";

module.exports = function (Schema) {

    var Q = app.utils.q;

    var ProposalSchema = new Schema({
        title: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
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

    ProposalSchema.statics.list = function(query, fields, projection){
        return Q.nbind(this.find, this)(query, fields, projection);
    };

    ProposalSchema.statics.findById = function(id){
        return Q.nbind(this.findOne, this)({ _id: id });
    };

    ProposalSchema.statics.insert = function(proposal){
        return Q.nbind(this.create, this)(proposal);
    };

    ProposalSchema.statics.update = function(id, data){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(proposal){
            for(var d in data){ if(proposal[d]) proposal[d] = data[d]; }
            return Q.nbind(proposal.save, proposal)();
        }).then(function(data){
            return data[0];
        });
    };

    ProposalSchema.statics.delete = function(id){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(proposal){
            return Q.nbind(proposal.remove, proposal)();
        });
    };

    return ProposalSchema;

};
