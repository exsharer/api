"use strict";

module.exports = function () {

    var proposal = new app.controllers.proposal();

    return [
        {
            method: 'get',
            url: '/proposals',
            action: proposal.list,
            cors: true,
            public: true
        },
        {
            method: 'get',
            url: '/proposals/:id',
            action: proposal.find,
            cors: true,
            public: true
        },
        {
            method: 'post',
            url: '/proposals',
            action: proposal.create,
            cors: true
        },
        {
            method: 'put',
            url: '/proposals/:id',
            action: proposal.update,
            cors: true
        },
        {
            method: 'delete',
            url: '/proposals/:id',
            action: proposal.delete,
            cors: true
        },
    ];

};
