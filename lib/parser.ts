/*
* The parse function is the same as in https://github.com/motdotla/dotenv v4.0.0
*/

export interface IObject {
  [key: string]: string;
}

const parser = (src: string) => {
  const obj: IObject = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split('\n').forEach(line => {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)

    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]

      // default undefined or missing values to empty string
      let value = keyValueArr[2] || ''

      // expand newlines in quoted values
      const len = value ? value.length : 0

      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"')
        value = value.replace(/\\n/gm, '\n')
      
      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()

      obj[key] = value
    }
  })
  return obj
}

export default parser;