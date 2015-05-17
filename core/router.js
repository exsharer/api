module.exports = function(express){

    require('./routers/mailer')();
    require('./routers/express')(express);
    require('./routers/oauth2')();
    require('./routers/finalstatuses')();

};
