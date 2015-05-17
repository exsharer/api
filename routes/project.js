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
        }
    ];

};
