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
            action: user.me,
            cors: true
        },
        {
            method: 'post',
            url: '/users',
            action: user.create,
            cors: true
        }
    ];

};
