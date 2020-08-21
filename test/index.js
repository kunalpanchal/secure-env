const fs = require("fs").promises;
const cryptography = require("../lib/cryptography");
const PASS = "password";
const path = require("path");
const expect = require("chai").expect;
const env = require("../lib/index");

describe("index", ()=> {
    it("should load up env vars", async()=> {

        const rawFile = path.join(__dirname , "./index.env")
        const encryptedFile = path.join(__dirname , "./index.env.enc")
        await cryptography.encrypt({
            secret: PASS,
            decryptedFile: rawFile,
            encryptedFile: encryptedFile,
            encryptionAlgo: "aes256",
            ivLength: 16
        })

        const vars = await env({
            secret: PASS,
            encryptedFile: encryptedFile,
            encryptionAlgo: "aes256",
            ivLength: 16
        })
        expect(vars).to.deep.equal({poo:"par", two: "2"})
    })
})