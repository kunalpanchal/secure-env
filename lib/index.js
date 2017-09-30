'use strict'

const fs = require('fs');
const cryptography = require('./cryptography');
const log = require('./utils/log');
const parser = require('./parser');

module.exports = (secret, envPath, decryptionAlgo) => {
    try {
        let decryptedContent = cryptography.decrypt({ secret, file: envPath, decryptionAlgo });
        if (decryptedContent) {
            let env = {};
            let parsedObj = parser(decryptedContent);
            Object.keys(parsedObj).forEach((key) => {
                if (!env.hasOwnProperty(key))
                    env[key] = parsedObj[key]
            })
            return env;
        }
    } catch (e) {
        log(e, 'error');
    }
}