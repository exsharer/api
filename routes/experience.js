"use strict";

module.exports = function () {

    var experience = new app.controllers.experience();

    return [
        {
            method: 'get',
            url: '/experiences',
            action: experience.list,
            cors: true,
            public: true
        },
        {
            method: 'get',
            url: '/experiences/:id',
            action: experience.find,
            cors: true,
            public: true
        },
        {
            method: 'post',
            url: '/experiences',
            action: experience.create,
            cors: true
        },
        {
            method: 'put',
            url: '/experiences/:id',
            action: experience.update,
            cors: true
        },
        {
            method: 'delete',
            url: '/experiences/:id',
            action: experience.delete,
            cors: true
        },
    ];

};
