global.app      = require('..');
global._        = app.utils._;
global.Q        = app.utils.q;
global.log      = app.utils.log;
global.util     = require('util');

var chai        = require('chai')
,   asPromised  = require('chai-as-promised');
chai.use(asPromised);

global.expect   = chai.expect || require('expect.js');

global.progress = require('progress');
global.async    = require('async');

global.request  = require('supertest')(app.application);

require('./client');
require('./user');
require('./project');
require('./proposal');
