global.app      = require('..');
global._        = app.utils._;
global.Q        = app.utils.q;
global.log      = app.utils.log;
global.expect   = require('expect.js');
global.progress = require('progress');
global.async    = require('async');
global.util     = require('util');
global.request  = require('supertest')(app.application);

require('./client');
require('./user');
require('./project');
