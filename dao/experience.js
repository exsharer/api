"use strict";

module.exports = function () {

    var Experience = app.db.Experience;

    return {
        list: function (query, fields, projection) {
            return Experience.list(query, fields, projection);
        },
        find: function (id) {
            return Experience.findById(id);
        },
        create: function (data) {
            return Experience.insert(data);
        },
        update: function(id, data) {
            return Experience.update(id, data);
        },
        delete: function (id) {
            return Experience.delete(id);
        }
    };

};
