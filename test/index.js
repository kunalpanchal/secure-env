const fs = require("fs").promises;
const cryptography = require("../lib/cryptography")
const PASS = "password";

describe("cryptography", ()=> {
    it("should decrypt files", async()=> {
        cryptography.encrypt({
            secret: PASS,
            inputFile: "",
            outputFilePath: "",
            encryptionAlgo: "aes256",
            ivLength: 16
        })
    })
})