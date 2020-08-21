const cryptography = require('./cryptography')
const parser = require('./parser')

/*
 * Options Expected
 * secret - Specify the secret Key which was used during encryption of raw file.Having a salt-hashed secret key is recommended.
 * path - You can specify a custom path if your file containing environment variables is named or located differently.
 * enc_algo - You may specify the encryption algorithm for your file containing environment variables using this option.
*/

/**
 *
 * @param {{secret: string, encryptedFile: string, encryptionAlgo: string, ivLength: number}} options
 * @returns {{}|void}
 */
module.exports = async (options) => {
    const decryptedContent = await cryptography.decrypt({
        secret: options.secret,
        encryptedFile: options.encryptedFile,
        encryptionAlgo: options.encryptionAlgo,
        ivLength: options.ivLength
    })
    if (!decryptedContent) return console.warn("no values loaded. This could be you have not set any variables in your .env file")

    const env = {}
    const parsedObj = parser(decryptedContent)
    Object.keys(parsedObj).forEach(key => {
        if (!env.hasOwnProperty(key)){
            env[key] = parsedObj[key]
        }
    })
    return env
}
