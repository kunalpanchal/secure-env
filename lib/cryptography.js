'use strict';

const crypto = require('crypto')
const fs = require('fs')
const log = require('./utils/log')

/* Arguments that can be passed are
 * --secret <secretKey>  | -s <secretKey>
 * --out <file-path> | -o <file-path>
 * --algo <algoName> |  -a <algoName>
 */

module.exports.decrypt = (options) => {
  try {
    const secret = options.secret || 'mySecret'
    const inputFile = options.file || '.env.enc'
    const decryptionAlgo = options.decryptionAlgo || 'aes256'
    const ivLength = options.ivLength || 16

    if (!fs.existsSync(inputFile)) throw `${inputFile} does not exist.`
    if (!secret || typeof secret !== 'string') throw 'No SecretKey provided.'

    var fileBuffer = fs.readFileSync(inputFile)

    var iv = fileBuffer.slice(0, ivLength)
    var ct = fileBuffer.slice(ivLength, fileBuffer.length)

    var key = crypto.createHash('sha256').update(String(secret)).digest()
    var decipher = crypto.createDecipheriv(decryptionAlgo, key, iv)
    var decrypted = decipher.update(ct, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (e) {
    log(e, 'error')
  }
}

module.exports.encrypt = (options) => {
  try {
    const secret = options.secret || 'mySecret'
    const inputFile = options.inputFile || '.env'
    const outputFilePath = options.outputFile || inputFile + '.enc'
    const encryptionAlgo = options.encryptionAlgo || 'aes256'
    const ivLength = options.ivLength || 16

    if (!fs.existsSync(inputFile)) throw 'Error: ' + inputFile + ' does not exist.'
    if (!secret || typeof secret !== 'string') throw 'No SecretKey provided.Use -s option to specify secret'

    var key = crypto.createHash('sha256').update(String(secret)).digest();
    var iv = crypto.randomBytes(ivLength)

    var cipher = crypto.createCipheriv(encryptionAlgo, key, iv)
    var output = fs.createWriteStream(outputFilePath)
    output.write(iv)
    fs.createReadStream(inputFile).pipe(cipher).pipe(output)

    output.on('finish', function() {
      log('The Environment file "' + inputFile + '" has been encrypted to "' + outputFilePath + '".', 'info')
      log('Make sure to delete "' + inputFile + '" for production use.', 'warn')
    })
  } catch (e) {
    log(e, 'error')
  }
}
