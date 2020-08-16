#! /usr/bin/env node

/* Arguments that can be passed are
 * --secret <secretKey>  | -s <secretKey>
 * --inputFile <file-path> | -i <file-path>
 * --encryptedFile <file-path> | -e <file-path>
 * --algo <algoName> |  -a <algoName>
 * --decrypt | -d
 */

const argv = require('minimist')(process.argv.slice(2))
const log = require('./utils/log')
const encryptedFile = argv.encryptedFile || argv.e
const inputFile = argv._[0]
const secret = argv.secret || argv.s
const encryptionAlgo = argv.algo || argv.a

const cryptography = require('./cryptography')


if (argv.decrypt || argv.d) log(cryptography.decrypt({secret, encryptedFile, encryptionAlgo}),'info')
	else cryptography.encrypt({ secret, inputFile, encryptedFile, encryptionAlgo });
