import fs from 'fs'
import parse from 'parse-gitignore'

/**
 * parseConfigFile
 *
 * parse gitignore like file
 *
 * @param filename {string}
 * @returns {Array<string>}
 */
const parseConfigFile = (filename) => {
  const {patterns} = parse(fs.readFileSync(filename))
  return patterns
}

export {parseConfigFile}
