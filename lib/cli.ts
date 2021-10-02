#! /usr/bin/env node

/* Arguments that can be passed are
 * --secret <secretKey>  | -s <secretKey>
 * --out <file-path> | -o <file-path>
 * --algo <algoName> |  -a <algoName>
 * --decrypt | -d
 */

import minimist from "minimist"
import { decrypt, encrypt } from './cryptography'
import log, { logTypes } from './utils/log'

const argv = minimist(process.argv.slice(2))

const outputFile = argv.out || argv.o
const inputFile = argv._[0]
const secret = argv.secret || argv.s
const encryptionAlgo = argv.algo || argv.a

// should decrypt or encrypt ?
if (argv.decrypt || argv.d)
	log(
		decrypt({ secret, file: outputFile, decryptionAlgo: encryptionAlgo }),logTypes.INFO
	)
else
	encrypt({ secret, inputFile, outputFile, encryptionAlgo });
