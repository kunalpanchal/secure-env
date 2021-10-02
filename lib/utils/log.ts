
export enum colorCodes {
  BLACK = '\x1b[30m',
  RED = '\x1b[31m',
  GREEN = '\x1b[32m',
  YELLOW = '\x1b[33m',
  BLUE = '\x1b[34m',
  MAGENTA = '\x1b[35m',
  CYAN = '\x1b[36m',
  RESET = '\x1b[0m'
}

export enum logTypes {
  ERROR,
  WARN,
  INFO
}

const getColorCode = (colorCode: colorCodes) => colorCode || colorCodes.RESET

const log = (data: any, type: logTypes, color?: colorCodes) => {
  if (!data)
    return;

  let logData = `${colorCodes.CYAN}Secure-env : ${colorCodes.RESET}`

  switch (type) {
    case logTypes.ERROR:
      logData += `${colorCodes.RED} ERROR OCCURED ${colorCodes.RESET}`
      break
    case logTypes.INFO:
      logData += `${colorCodes.GREEN} INFO ${colorCodes.RESET}`
      break
    case logTypes.WARN:
      logData += `${colorCodes.YELLOW} WARNING ${colorCodes.RESET}`
      break
  }

  logData += color ? `${getColorCode(color)}${data}${colorCodes.RESET}` : data
  console.log(logData)

}

export default log;