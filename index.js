/*

Copyright (c) 2014 Bool Inc
Bool Node.js MVC Framework

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

// Load of nodejs modules
var http        = require('http');

// Generate server
var app         = require('./core/loader');
var srv         = require('./core/server')(app);

app.application = srv;

var startServer = function(){

    http.createServer(srv).listen(
        srv.get('port'),
        srv.get('host'),
        function(){
            console.log(
                'Express server listening on http://%s:%d',
                srv.get('host'),
                srv.get('port')
            );
        }
    );

};

if(require.main !== module){
    module.name     = "EXSharer API";
    module.exports  = app;
} else {
    startServer();
}
