import crypto from 'crypto'
import fs from 'fs'
import log, { logTypes } from './utils/log'

/* Arguments that can be passed are
 * --secret <secretKey>  | -s <secretKey>
 * --out <file-path> | -o <file-path>
 * --algo <algoName> |  -a <algoName>
 * --decrypt | -d 
 */

export interface IDecryptOptions {
  /** 
   * The secret key needed to encrypt/decrypt the file.\
   * `Required`
   * */
  secret: string;

  /** 
   * Path to the encrypted env file.\
   * Default: `.env.enc`
   * */
  file?: fs.PathLike;

  /** 
   * The decryption algorithm to use.\
   * Default: `aes256`
   * */
  decryptionAlgo?: crypto.CipherGCMTypes;

  /** 
   * IV length.\
   * Default: `16`
   * */
  ivLength?: number;
}

export interface IEncryptOptions {
  /** 
   * The secret key needed to encrypt/decrypt the file.\
   * **Required**
   * */
  secret: string;

  /** 
   * The env file to encrypt.\
   * Default: `.env`
   * */
  inputFile?: fs.PathLike;

  /** 
   * The path and name of the generated file \
   * Default: `${inputFile}.enc`
   * */
  outputFile?: fs.PathLike;

  /** 
   * The encryption algorithm to use.\
   * Default: `aes256`
   * */
  encryptionAlgo: crypto.CipherGCMTypes

  /** 
   * IV length.\
   * Default: `16`
   * */
  ivLength?: number;
}

// In the code
export const decrypt = (options: IDecryptOptions) => {
  try {
    const secret = options.secret || 'mySecret'
    const inputFile = options.file || '.env.enc'
    const decryptionAlgo = options.decryptionAlgo || 'aes256'
    const ivLength = options.ivLength || 16

    if (!fs.existsSync(inputFile))
      throw new Error(`${inputFile} does not exist.`)

    if (!secret || typeof secret !== 'string')
      throw new Error('No SecretKey provided.')

    const fileBuffer = fs.readFileSync(inputFile)
    const iv = fileBuffer.slice(0, ivLength)
    const ciphertext = fileBuffer.slice(ivLength, fileBuffer.length)
    const key = crypto.createHash('sha256').update(String(secret)).digest()
    const decipher = crypto.createDecipheriv(decryptionAlgo, key, iv)

    //@ts-expect-error
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8')
    //@ts-expect-error
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (e) {
    log(e, logTypes.ERROR)
  }
}

// With the cli
export const encrypt = (options: IEncryptOptions) => {
  try {
    const secret = options.secret || 'mySecret'
    const inputFile = options.inputFile || '.env'
    const outputFilePath = options.outputFile || `${inputFile}.enc`
    const encryptionAlgo = options.encryptionAlgo || 'aes256'
    const ivLength = options.ivLength || 16

    // presumably createCipheriv() should work for all the algo in ./openssl_list-cipher-algorithms.csv with the right key/iv length

    if (!fs.existsSync(inputFile))
      throw new Error(`Error: ${inputFile} does not exist.`);

    if (!secret || typeof secret !== 'string')
      throw new Error('No SecretKey provided.Use -s option to specify secret');

    const key = crypto.createHash('sha256').update(String(secret)).digest() // /// TODO: node v10.5.0+ should use crypto.scrypt(secret, salt, keylen[, options], callback)

    const iv = crypto.randomBytes(ivLength)
    const cipher = crypto.createCipheriv(encryptionAlgo, key, iv)
    const output = fs.createWriteStream(outputFilePath)

    output.write(iv)
    fs.createReadStream(inputFile).pipe(cipher).pipe(output)

    output.on('finish', () => {
      log(`The Environment file "${inputFile}" has been encrypted to "${outputFilePath}".`, logTypes.INFO);
      log(`Make sure to delete "${inputFile}" for production use.`, logTypes.WARN);
    })

  } catch (e) {
    log(e, logTypes.ERROR)
  }
}
