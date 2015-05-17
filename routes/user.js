module.exports = function(){

    var user = new app.controllers.user();

    return [
        {
            method: 'get',
            url: '/users/me',
            action: user.me,
            cors: true
        }
    ];

};
