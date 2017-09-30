# secure-env

Secure-env is a module that loads environment variables from a `.env.enc` file.A encryption tool that would helps you prevent attacks from [npm-malicious-packages][npm-malicious-packages].

## Install

```bash
$ npm install secure-env -g
```

## Usage

Create a `.env` file in the root directory of your project. Add
environment-specific variables on new lines in the form of `NAME=VALUE`.
For example:

```dosini
DB_HOST=localhost:27017
DB_USER=scott
DB_PASS=tiger
```

### Encrypt .env

```bash
$ secure-env .env -s mySecretPassword
```
A new encrypted file `.env.enc` will be created in your project root directory.You can delete the `.env` file after this,to prevent stealing.
 
 ### Decrypt .env.enc
 
As early as possible in your application, require and configure dotenv.

```javascript
let secureEnv = require('secure-env');
global.env = secureEnv({secret:'mySecretPassword'});

```

That's it.

`global.env` now has the keys and values you defined in your `.env` file.

```javascript
var db = require('db')
db.connect({
  host: global.env.DB_HOST,
  username: global.env.DB_USER,
  password: global.env.DB_PASS
})
```

## Options

### Encryption

```bash
$ secure-env --option <VALUE> <file-path-which-is-to-be-encrypted>
```

| Option | What does it do | Defaults |
| ------ | ------ | ------ |
| --secret <secretKey> | Specify the secret Key which would be later used to decrypt the file. | `mySecret` |
| --out <file-path> | The encrypted file path that would be created. | `env.enc` |
| --algo <algoName> | The encryption algorithm that is to be used to encrypt the env file. | `aes192` |


### Decryption

#### Path

Default: `.env`

You can specify a custom path if your file containing environment variables is
named or located differently.

```js
require('secure-env')({path:'/custom/path/to/your/env/vars'});
```

#### Decryption Algorithm

Default: `aes192`

You may specify the encryption algorithm for your file containing environment variables
using this option.

```js
require('secure-env')({enc_algo:'aes256'});
```

#### Secret

Default: `mySecret`

Specify the secret Key which was used during encryption of raw file.Having a salt-hashed secret key is recommended.

```js
require('secure-env')({secret:'mySecretPassword'});
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

Source-env is inspired from and also uses code references from these open source projects:

* [Dotenv][dotenv]

[npm-malicious-packages]: <https://iamakulov.com/notes/npm-malicious-packages/>
[minimist]: <https://www.npmjs.com/package/minimist>
[dotenv]: <https://github.com/motdotla/dotenv/>
