var User        = app.dao.user
,   Client      = app.dao.client
,   Token       = app.dao.token;

var _           = app.utils._
,   log         = app.utils.log
,   passport    = app.utils.passport;

var BasicStrategy           = require('passport-http').BasicStrategy;
var BearerStrategy          = require('passport-http-bearer').Strategy;
var ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy;

passport.serializeUser(function(user, done) {
    done(null, _.omit(user, 'password'));
});

passport.deserializeUser(function(user, done) {
    done(null, _.omit(user, 'password'));
});

passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {

        var dao = new Client();

        dao.find(clientId, clientSecret).then(function(client){
            done(null, client || false);
        }).catch(done);

    }
));

passport.use(new BearerStrategy(
    function(accessToken, done) {

        var token = new Token()
        ,   user = new User();

        token.user(accessToken).then(function(tok){
            return user.find(tok.user);
        }).then(function(us){
            done(null, us || false);
        }).catch(done);

    }
));
