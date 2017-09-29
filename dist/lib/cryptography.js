"use strict";

var crypto = require('crypto');
var fs = require('fs');
var encryptionAlgo = 'aes192';
console.log('This is the filesearch script.');

module.exports.decrypt = function (err, options) {
    var secret = options.secret;
    var inputFile = options.inputFile || '.env.enc';

    var decipher = crypto.createDecipher(encryptionAlgo, secret);
    var input = fs.createReadStream(inputFile).pipe(decipher);

    var string = '';
    input.on('end', function () {
        return console.log('final output \n' + string);
    });
    input.on('data', function (buffer) {
        return string += buffer;
    });
};

module.exports.encrypt = function (err, options) {
    try {
        var secret = options.secret;
        var inputFile = options.inputFile || '.env';
        if (!secret) throw 'Error : Secret not given';
        var cipher = crypto.createCipher(encryptionAlgo, secret);
        var input = fs.createReadStream(inputFile);
        var output = fs.createWriteStream(inputFile + '.enc');
        input.pipe(cipher).pipe(output);
    } catch (e) {
        err(e);
    }
};