"use strict";

module.exports = function(){

    var user = new app.controllers.user();

    return [
        {
            method: 'get',
            url: '/users',
            action: user.list,
            cors: true
        },
        {
            method: 'get',
            url: '/users/me',
            action: user.find.me,
            cors: true
        },
        {
            method: 'get',
            url: '/users/:id',
            action: user.find.id,
            cors: true
        },
        {
            method: 'post',
            url: '/users',
            action: user.create,
            cors: true,
            public: true
        },
        {
            method: 'put',
            url: '/users/me',
            action: user.update.me,
            cors: true,
            public: true
        },
        {
            method: 'put',
            url: '/users/:id',
            action: user.update.id,
            cors: true,
            public: true
        },
        {
            method: 'delete',
            url: '/users/me',
            action: user.delete.me,
            cors: true,
            public: true
        },
        {
            method: 'delete',
            url: '/users/:id',
            action: user.delete.id,
            cors: true,
            public: true
        }
    ];

};
