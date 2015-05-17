var q = require('q'),
    _ = require('underscore');

function checkAField(required, object, index){

    missingFields = [];
    
    for(field in required){

        rField = required[field];
        
        if(
            !(_.has(object, rField) &&
            (
                (object[rField] == 0 || object[rField]) || object[rField] != ""
            )
        )) {
            missingFields.push(rField);
        }

    }
    
    if(missingFields.length > 0){

        throw new BoolError(
            400,
            "missing_fields",
            missingFields
        );

    }

}

module.exports = function(required, object){

    return q.fcall(function(){

        if (_.isArray(object)){
            for(o in object){
                return checkAField(required, object[o], o);
            }
        } else {
            return checkAField(required, object);
        }

    });

}
