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
        create: function (project) {
            return Project.insert(project);
        },
        update: function(id, data) {
            return Project.update(id, data);
        },
        delete: function (id) {
            return Project.delete(id);
        }
    };

};
