[![npm version](https://badge.fury.io/js/secure-env.svg)](https://badge.fury.io/js/secure-env)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/kunalpanchal/secure-env/graphs/commit-activity)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/kunalpanchal/secure-env/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/Naereen/StrapDown.js.svg)](https://gitHub.com/kunalpanchal/secure-env/releases/)
[![Github all releases](https://img.shields.io/github/downloads/Naereen/StrapDown.js/total.svg)](https://gitHub.com/kunalpanchal/secure-env/releases/)


# secure-env-async

Secure-env is a module that loads environment variables from a `.env.enc` file.A encryption tool that would helps you prevent attacks from [npm-malicious-packages][npm-malicious-packages].

## Usage

```bash
$ npm install secure-env-async
```

Create a `.env` file somewhere in your project. Add
environment-specific variables on new lines in the form of `NAME=VALUE`.
For example:

```dosini
KEY=VALUE
NUMBER=2 #numbers are parsed as strings
```

### Encrypt .env

```bash
$ npm install -g secure-env 
$ secure-env .env -s mySecretPassword
```
Alternatively if you want this installed locally run the command as follows:

```bash
$ ./node_modules/secure-env-async/lib/cli.js .env -s mySecretPassword -o .env.enc
```

If you are running NPM > v5.2. You can use `npx`:

```bash
$ npx secure-env .env -s mySecretPassword -o .env.enc
```

A new encrypted file `.env.enc` will be created in your project root directory. You can delete the `.env` file now

 
### Loading env in app
 
As early as possible in your application, require and configure dotenv.

```js
let secureEnv = require('secure-env');
const envObject = await secureEnv({secret:'mySecretPassword', encryptedFile: 'pathToEncryptedFile' });

```
`envObject` now has all the parsed variables assigned as keys and values.  

### Decrypting env to terminal
🚨This procedure can completely undo the entire security of this module. Make sure you do not commit the decrypted file!🚨️

```shell script
npx secure-env -d -e "encryptedFilePath" 
```
## Options

### Encryption

```bash
$ secure-env --option <VALUE> <file-path-which-is-to-be-encrypted>
```

| Option | What does it do | Defaults |
| ------ | ------ | ------ |
| --secret <secretKey> | Specify the secret Key which would be later used to decrypt the file. | `mySecret` |
| --encryptedFile <file-path> | The encrypted file path that would be created. | `env.enc` |
| --algo <algoName> | The encryption algorithm that is to be used to encrypt the env file. | `aes256` |
| --decrypt | prints the decrypted text to stdout


### Decryption

#### Path

Default: `.env`

You can specify a custom path if your file containing environment variables is
named or located differently.

```js
await require('secure-env')({path:'/custom/path/to/your/env/vars'});
```

#### Decryption Algorithm

Default: `aes256`

You may specify the encryption algorithm for your file containing environment variables
using this option.

```js
await require('secure-env')({enc_algo:'aes256'});
```

#### Secret

Default: `mySecret`

Specify the secret Key which was used during encryption of raw file.Having a salt-hashed secret key is recommended.

```js
await require('secure-env')({secret:'mySecretPassword'});
```

## Parse rules 

Refer https://github.com/motdotla/dotenv/blob/master/README.md#parse

The parsing engine currently supports the following rules:

- `BASIC=basic` becomes `{BASIC: 'basic'}`
- empty lines are skipped
- lines beginning with `#` are treated as comments
- empty values become empty strings (`EMPTY=` becomes `{EMPTY: ''}`)
- single and double quoted values are escaped (`SINGLE_QUOTE='quoted'` becomes `{SINGLE_QUOTE: "quoted"}`)
- new lines are expanded if in double quotes (`MULTILINE="new\nline"` becomes

```
{MULTILINE: 'new
line'}
```
- inner quotes are maintained (think JSON) (`JSON={"foo": "bar"}` becomes `{JSON:"{\"foo\": \"bar\"}"`)
- whitespace is removed from both ends of the value (see more on [`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)) (`FOO="  some value  "` becomes `{FOO: 'some value'}`)
G.md)

## License

See [LICENSE](LICENSE)

## Dependencies

Source-env uses these open source projects to work properly:

* [Minimist][minimist] - Argument parser without all the fanciful decoration.

## Acknowledgements

Source-env-async is stolen directly from secure-env to fix bugs and add features i wanted

it apparently also takes inspiration from:

* [Dotenv][dotenv]

[npm-malicious-packages]: <https://iamakulov.com/notes/npm-malicious-packages/>
[minimist]: <https://www.npmjs.com/package/minimist>
[dotenv]: <https://github.com/motdotla/dotenv/>
