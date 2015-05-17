"use strict";

module.exports = function () {

    var project = new app.controllers.project();

    return [
        {
            method: 'get',
            url: '/projects',
            action: project.list,
            cors: true,
            public: true
        },
        {
            method: 'get',
            url: '/projects/:id',
            action: project.find,
            cors: true,
            public: true
        },
        {
            method: 'post',
            url: '/projects',
            action: project.create,
            cors: true,
            public: true
        },

    ];

};
