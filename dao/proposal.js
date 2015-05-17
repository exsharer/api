"use strict";

module.exports = function () {

    var Proposal = app.db.Proposal;

    return {
        list: function (query, fields, projection) {
            return Proposal.list(query, fields, projection);
        },
        find: function (id) {
            return Proposal.findById(id);
        },
        create: function (proposal) {
            return Proposal.insert(proposal);
        },
        update: function(id, data) {
            return Proposal.update(id, data);
        },
        delete: function (id) {
            return Proposal.delete(id);
        }
    };

};
