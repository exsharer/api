"use strict";

module.exports = function() {

    var Question = app.db.Question;

    return {
        list: function (query, fields, projection) {
            return Question.list(query, fields, projection);
        },
        find: function (id) {
            return Question.findById(id);
        },
        create: function (question) {
            return Question.insert(question);
        },
        update: function(id, data) {
            return Question.update(id, data);
        },
        delete: function (id) {
            return Question.delete(id);
        }
    };

};
