'use strict';

var FastClick = require('fastclick');
FastClick.attach(document.body, {});

require('router').run(document.getElementById('app'));
