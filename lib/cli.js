#! /usr/bin/env node
const cryptography = require('./cryptography');

cryptography.encrypt((err) => {
    console.log(err);
},
    { secret: 'theSecre', inputFile: process.argv[2] });
// cryptography.decrypt({ secret: 'theSecret', inputFile: process.argv[2] });