#! /usr/bin/env node

/* Arguments that can be passed are
 * --secret <secretKey>  | -s <secretKey>
 * --encryptedFile <file-path> | -e <file-path>
 * --decryptedFile <file-path> | -o
 * --algo <algoName> |  -a <algoName>
 * --decrypt | -d
 */
const log = require("../lib/utils/log")
const argv = require('minimist')(process.argv.slice(2))
const encryptedFile = argv.encryptedFile || argv.e
const inputFile = argv._[0]
const secret = argv.secret || argv.s
const encryptionAlgo = argv.algo || argv.a
const decryptedFile = argv.decryptedFile || arv.o

const cryptography = require('./cryptography')

(async ()=> {
    if (argv.decrypt || argv.d){
        try {
            await cryptography.decrypt({secret, encryptedFile, encryptionAlgo, decryptedFile})
        } catch (e) {
            log(e, "ERROR")
        }

    } else {
        try {
            cryptography.encrypt({secret, decryptedFile, encryptedFile, encryptionAlgo});
        } catch (e) {
            log(e, "ERROR")
        }

    }
})()

