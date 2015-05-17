'use strict';

module.exports = function(str, pattern, args){

    return str.replace(pattern, function(match, key){
        return (args[key] !== undefined ?
            args[key] :
            match
        );
    });

};
