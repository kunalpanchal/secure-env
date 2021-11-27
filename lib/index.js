'use strict'

const cryptography = require('./cryptography')
const log = require('./utils/log')
const parser = require('./parser')

/*
 * Options Expected
 * secret - Specify the secret Key which was used during encryption of raw file.Having a salt-hashed secret key is recommended.
 * path - You can specify a custom path if your file containing environment variables is named or located differently.
 * enc_algo - You may specify the encryption algorithm for your file containing environment variables using this option.
*/

module.exports = (options) => {
  try {
    const decryptedContent = cryptography.decrypt({
      secret: options.secret,
      inputFile: options.path,
      decryptionAlgo: options.enc_algo
    })
    if (decryptedContent) {
      const env = {}
      const parsedObj = parser(decryptedContent)
      Object.keys(parsedObj).forEach(key => {
        if (!env.hasOwnProperty(key)) { env[key] = parsedObj[key] }
      })
      return env
    }
  } catch (e) {
    log(e, 'error')
  }
}
