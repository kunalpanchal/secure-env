#! /usr/bin/env node

/* Arguments that can be passed are
 * --secret <secretKey>  | -s <secretKey>
 * --out <file-path> | -o <file-path>
 * --algo <algoName> |  -a <algoName>
 */

const argv = require('minimist')(process.argv.slice(2))
const outputFile = argv.outputFile || argv.o
const inputFile = argv._[0]
const secret = argv.secret || argv.s
const encryptionAlgo = argv.algo || argv.a

const cryptography = require('./cryptography')

cryptography.encrypt({ secret, inputFile, outputFile, encryptionAlgo })
