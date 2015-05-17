"use strict";

var Token   = new app.dao.token()
,   User    = new app.dao.user();

// Create OAuth 2.0 Authorization Server
var oauth2orize = app.utils.oauth2orize
,   passport    = app.utils.passport
,   server      = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(
    function(client, username, password, scope, done) {

        User.login(username, password).then(function(user){
            if(!user) return false;
            Token.token(user._id, client._id).then(function(token){
                if(!token) return Token.create(user._id, client._id);
                return token;
            });
        }).then(function(token){
            done(null, token.access || false, token.refresh);
        }).catch(done);

    }
));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(
    function(client, refreshToken, scope, done) {

        Token.refresh(refreshToken).then(function(data){
            if(!data) return done(null, false);
            return Token.create(data.user, data.client);
        }).catch(done);

    }
));

// Token authorization server endpoint
module.exports = [
    passport.authenticate(['oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];
