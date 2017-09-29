#! /usr/bin/env node
'use strict';

var cryptography = require('./cryptography');

cryptography.encrypt(function (err) {
    console.log(err);
}, { secret: 'theSecre', inputFile: process.argv[2] });
// cryptography.decrypt({ secret: 'theSecret', inputFile: process.argv[2] });