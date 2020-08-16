const fs = require("fs").promises;
const cryptography = require("../lib/cryptography");
const PASS = "password";
const path = require("path");
const expect = require("chai").expect;

describe("cryptography", ()=> {
    it("should encrypt and decrypt files", async()=> {

        const rawFile = path.join(__dirname , "./test.env")
        const encryptedFile = path.join(__dirname , "./test.env.enc")
        await cryptography.encrypt({
            secret: PASS,
            inputFile: rawFile,
            encryptedFile: encryptedFile,
            encryptionAlgo: "aes256",
            ivLength: 16
        })

        const decrypted = cryptography.decrypt({
            secret: PASS,
            encryptedFile: encryptedFile,
            encryptionAlgo: "aes256",
            ivLength: 16
        })

        expect(decrypted).equal("foo=bar")
    })
})