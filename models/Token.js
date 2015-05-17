'use strict';

module.exports = function(Schema, mongoose){

    var _           = app.utils._
    ,   Q           = app.utils.q
    ,   log         = app.utils.log
    ,   token       = app.utils.token
    ,   lifetime    = app.config.security.expiresIn;

    Q.longStackSupport = true;

    var TokenSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
            required: true
        },
        scope: [ String ],
        access: {
            type: String,
            unique: true,
            required: true,
            default: token(64)
        },
        refresh: {
            type: String,
            unique: true,
            required: true,
            default: token(64)
        },
        created: {
            type: Date,
            required: true,
            default: Date.now
        },
        expires: {
            type: Date,
            required: true
        }
    });

    TokenSchema.pre('validate', function(next){

        var date = new Date(this.created);
        date.setSeconds(date.getSeconds() + lifetime);
        this.expires = date;

        next();
    });

    TokenSchema.statics.token = function(user, client){

        return Q.nbind(this.findOne, this)({
            user: user,
            client: client,
            expires: { $gte: new Date() }
        }, [
            'scope',
            'access',
            'refresh'
        ], {
            sort: { created: 1 }
        });
    };

    TokenSchema.statics.user = function(access){

        return Q.nbind(this.findOne, this)({
            access: access
        }, 'user', {
            sort: { created: 1 }
        });
    };

    TokenSchema.statics.insert = function(user, client){

        return Q.nbind(this.create, this)({
            user: user,
            client: client
        });
    };

    TokenSchema.statics.refresh = function(refresh){

        return Q.nbind(this.findOne, this)({
            refresh: refresh
        }, {
            sort: { created: 1 }
        });
    };

    return TokenSchema;

};
