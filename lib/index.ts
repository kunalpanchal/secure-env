import { decrypt, IDecryptOptions } from './cryptography'
import log, { logTypes } from './utils/log'
import parser, { IObject } from './parser'

interface IOptions extends IDecryptOptions { }

const SecureEnv = <T extends IObject>(options: IOptions): T | undefined => {
  try {
    const decryptedContent = decrypt(options);

    if(decryptedContent)
      return parser(decryptedContent) as T;

  } catch (e) {
    log(e, logTypes.ERROR)
  }
}

export default SecureEnv;
export { IObject } from "./parser"