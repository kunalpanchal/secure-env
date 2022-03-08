#! /usr/bin/env node

/* Arguments that can be passed are
 * --secret <secretKey>  | -s <secretKey>
 * --out <file-path> | -o <file-path>
 * --algo <algoName> |  -a <algoName>
 * --algo <algoName> |  -a <algoName>
 * --decrypt | -d
 */

const argv = require('minimist')(process.argv.slice(2))
const log = require('./utils/log')
const outputFile = argv.outputFile || argv.o
const inputFile = argv._[0]
const secret = argv.secret || argv.s
const encryptionAlgo = argv.algo || argv.a

const cryptography = require('./cryptography')


if (argv.decrypt || argv.d) console.log(cryptography.decrypt({secret, outputFile, encryptionAlgo}))
	else cryptography.encrypt({ secret, inputFile, outputFile, encryptionAlgo });
