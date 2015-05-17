'use strict';

module.exports = function(Schema, mongoose){

    var salt = app.config.security.salt;

    var UserSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        name: {
            first: {
                type: String,
                required: true
            },
            middle: {
                type: String,
                required: false
            },
            last: {
                type: String,
                required: true
            }
        },
        birthday: {
            type: Date,
            required: true
        },
        facebookId: {
            type: String,
            index: true
        },
        password: {
            type: String,
            required: true,
            private: true
        }
    });

    UserSchema.pre('save', function(done){ var user = this;
        if(!user.isModified('password')) return next();

        bcrypt.genSalt(salt, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    });

    UserSchema.methods.login = function(password){
        return Q.nfcall(bcrypt.compare, password, this.password);
    }

    UserSchema.statics.list = function(query, fields, projection){
        return Q.nbind(this.find, this)(query, fields, projection);
    };

    UserSchema.statics.findById = function(id){
        return Q.nbind(this.findOne, this)({ _id: id });
    };

    UserSchema.statics.findByUsername = function(id){
        return Q.nbind(this.findOne, this)({ email: id });
    };

    UserSchema.statics.insert = function(user){
        return Q.nbind(this.create, this)(user);
    };

    UserSchema.statics.update = function(id, user){
        return Q.nbind(this.findOneAndUpdate, this)({ _id: id }, user);
    };

    UserSchema.statics.delete = function(id){
        return Q.nbind(this.findOne, this)({ _id: id }).then(function(user){
            return Q.nbind(client.remove, client)();
        });
    };

    UserSchema.plugin(app.utils.mongoose.private);
    return UserSchema;

}
