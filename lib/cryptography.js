"use strict"

const crypto = require('crypto');
const fs = require('fs');
const encryptionAlgo = 'aes192';
console.log('This is the filesearch script.');

module.exports.decrypt = (err, options) => {
    const secret = options.secret;
    const inputFile = options.inputFile || '.env.enc';

    const decipher = crypto.createDecipher(encryptionAlgo, secret);
    const input = fs.createReadStream(inputFile).pipe(decipher);

    var string = ''
    input.on('end', () => console.log('final output \n' + string));
    input.on('data', buffer => string += buffer);

};

module.exports.encrypt = (err, options) => {
    try {
        const secret = options.secret;
        const inputFile = options.inputFile || '.env';
        if (!secret) throw 'Error : Secret not given';
        const cipher = crypto.createCipher(encryptionAlgo, secret);
        const input = fs.createReadStream(inputFile);
        const output = fs.createWriteStream(`${inputFile}.enc`);
        input.pipe(cipher).pipe(output);
    } catch (e) {
        err(e);
    }
};