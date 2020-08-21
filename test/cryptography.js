const fs = require("fs").promises;
const cryptography = require("../lib/cryptography");
const PASS = "password";
const path = require("path");
const expect = require("chai").expect;
const exec = require("child_process").exec;

describe("cryptography", () => {
    it("should encrypt and decrypt files", async () => {
        const rawFile = path.join(__dirname, "./test.env")
        const encryptedFile = path.join(__dirname, "./test.env.enc")
        await cryptography.encrypt({
            secret: PASS,
            decryptedFile: rawFile,
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

    it("cli should decrypt file to file system", async () => {
        const rawFile = path.join(__dirname, "./should_decrypt.env")
        const encryptedFile = path.join(__dirname, "./should_decrypt.env.enc")
        const decryptedFile = path.join(__dirname, "./should_decrypt_2.env")

        await cryptography.encrypt({
            secret: PASS,
            decryptedFile: rawFile,
            encryptedFile: encryptedFile,
            encryptionAlgo: "aes256",
            ivLength: 16
        })

        await new Promise((resolve, reject)=> {
            const cliPath = path.join(__dirname, "../lib/cli.js");
            exec(`node ${cliPath} --decrypt --encryptedFile ${encryptedFile} --decryptedFile ${decryptedFile} --secret ${PASS}`, (error, stdout, stderr) => {
                if (error) return reject(error)
                // if (stderr) return reject(stderr)
                return resolve(stdout)
            });
        })

        let text = await fs.readFile(decryptedFile, "utf-8")
        expect(text).equal("dum=bo")
    })
})