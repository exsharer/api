var crypto = require('crypto'),
    jsonfile = require('jsonfile');

var path = "config/security.json";
var obj = {
    salt: crypto.randomBytes(64).toString('base64')
}

jsonfile.writeFile(path, obj, function(err){
    if(err) console.log(err)
    else console.log("Success")
});
