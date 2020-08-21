const colorCodes = {
  BLACK: '\x1b[30m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
  RESET: '\x1b[0m'
}

function getColorCode (colorName) {
  const colorCode = colorCodes[colorName.toUpperCase()]
  return colorCode || colorCodes.RESET
}

module.exports = (data, type, color) => {
  if (data) {
    let logData = `${colorCodes.CYAN}Secure-env-async : ${colorCodes.RESET}`
    switch (type.toUpperCase()) {
      case 'ERROR':
        logData += `${colorCodes.RED} ERROR OCCURED ${colorCodes.RESET}`
        break
      case 'INFO':
        logData += `${colorCodes.GREEN} INFO ${colorCodes.RESET}`
        break
      case 'WARN':
        logData += `${colorCodes.YELLOW} WARNING ${colorCodes.RESET}`
        break
    }

    logData += color ? `${getColorCode(color)}${data}${colorCodes.RESET}` : data
    console.log(logData)
  }
}
