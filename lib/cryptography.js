"use strict"

const crypto = require('crypto');
const fs = require('fs');
const log = require('./utils/log');

/* Arguments that can be passed are  
 * --secret <secretKey>  | -s <secretKey>
 * --out <file-path> | -o <file-path>
 * --algo <algoName> |  -a <algoName> 
 */

module.exports.decrypt = (options) => {
    try {
        const secret = options.secret;
        const inputFile = options.file || '.env.enc';
        const decryptionAlgo = options.decryptionAlgo || `aes192`;

        if (!fs.existsSync(inputFile)) throw `${inputFile} does not exist.`
        if (!secret || typeof (secret) !== 'string') throw 'No SecretKey provided.';

        const decipher = crypto.createDecipher(decryptionAlgo, secret);
        let decrypted = decipher.update(fs.readFileSync(inputFile), 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (e) {
        log(e, 'error');
    }
};

module.exports.encrypt = (options) => {
    try {
        const secret = options.secret;
        const inputFile = options.inputFile || '.env';
        const outputFilePath = options.outputFile || `${inputFile}.enc`;
        const encryptionAlgo = options.encryptionAlgo || `aes192`;

        if (!fs.existsSync(inputFile)) throw `Error: ${inputFile} does not exist.`
        if (!secret || typeof (secret) !== 'string') throw 'No SecretKey provided.Use -s option to specify secret';

        const cipher = crypto.createCipher(encryptionAlgo, secret);
        const output = fs.createWriteStream(outputFilePath);
        fs.createReadStream(inputFile).pipe(cipher).pipe(output);
        
        output.on('finish', () => {
            log(`The Environment file "${inputFile}" has been encrypted to "${outputFilePath}".`, 'info');
            log(`Make sure to delete "${inputFile}" for production use.`, 'warn');
        });
        
    } catch (e) {
        log(e, 'error');
    }
};