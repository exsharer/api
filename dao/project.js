"use strict";

module.exports = function () {

    var Project = app.db.Project;

    return {
        list: function (query, fields, projection) {
            return Project.list(query, fields, projection);
        },
        find: function (id) {
            return Project.findById(id);
        },
        create: function (data) {
            return Project.insert(data);
        },
        update: function(id, data) {
            return Project.update(id, data);
        },
        addExperience: function(id, experienceId){
            return Project.addExperience(id, experienceId);
        },
        addProposal: function(id, proposalId){
            return Project.addProposal(id, proposalId);
        },
        delete: function (id) {
            return Project.delete(id);
        }
    };

};
