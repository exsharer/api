"use strict";

var Token   = new app.dao.token()
,   User    = new app.dao.user();

var oauth2orize = app.utils.oauth2orize
,   passport    = app.utils.passport
,   server      = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(
    function(client, username, password, scope, done) {
        User.login(username, password).then(function(user){
            return user ? Token.create(user._id, client._id) : false;
        }).then(function(token){
            done(null, token.access || false, token.refresh);
        }).catch(done);
    }
));

server.exchange(oauth2orize.exchange.refreshToken(
    function(client, refreshToken, scope, done) {
        Token.refresh(refreshToken).then(function(data){
            if(!data) return done(null, false);
            return Token.create(data.user, data.client);
        }).catch(done);
    }
));

module.exports = [
    passport.authenticate(['oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];
