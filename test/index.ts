import SecureEnv, { IObject } from "../dist";

interface IEnv extends IObject{
    val1: string;
    val2: string;
}

const test = SecureEnv<IEnv>({
    secret: "mySecret",
    decryptionAlgo: "aes-128-gcm",
    file: ".env",
    ivLength: 24
})

