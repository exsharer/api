"use strict";

module.exports = function(){

    global.BoolError = function(status, code, message, uri){

        Error.apply(this, arguments);

        if(!(typeof status === 'number' && (status % 1) === 0)) {
            // First argument is errorCode
            status = 500;
            code = status || 'server_error';
            message = code || null;
            uri = message || null;
        }

        Error.call(this);
        Error.captureStackTrace(this, BoolError);
        this.name = 'BoolError';
        this.status = status || 500;
        this.code = code || 'server_error';
        this.message = message;
        this.uri = uri;

    };

    /**
    * Inherit from `Error`.
    */
    BoolError.prototype = Error.prototype;

    global.EventNotFoundError = function(){

        return new BoolError(
            404,
            'event_not_found',
            "The event wasn't found, please check id"
        );

    };

    global.InvalidPasswordError = function () {

        return new BoolError(
            401,
            "invalid_credentials",
            "invalid_password"
        );

    };

};
