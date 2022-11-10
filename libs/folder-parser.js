import ignore from 'ignore'
import glob from 'glob-promise'
import fs from 'fs-extra'
import fsSystem from 'fs'
import chalk from "chalk"

/**
 *
 * @param pattern {Array<string>|string}
 * @param sourceFolder {string}
 * @returns {Promise<String[]>}
 */
const listFiles = async (pattern, sourceFolder = '.') => {
  const patters = []
  if (!Array.isArray(pattern)) {
    patters.push(pattern)
  } else {
    patters.push(...pattern)
  }

  const list = []

  for(const el of patters) {
    const listSubFolder = await glob(el, {
      // Adds a / character to directory matches.
      mark: true,
      cwd: sourceFolder
    })
    list.push(...listSubFolder)
  }

  // return ignore().add(patterns).filter(list)
  return list
}

/**
 * filterIgnoredFiles
 *
 * @param sourceList {Array<string>}
 * @param pattern {Array<string>|string}
 * @param sourceFolder {Array<string>|string}
 *
 * @returns {Array<String>}
 */
const filterIgnoredFiles = (sourceList, pattern, sourceFolder) => {
  const patters = []
  if (!Array.isArray(pattern)) {
    patters.push(pattern)
  } else {
    patters.push(...pattern)
  }

  const matchingPaths = ignore().add(patters).filter(sourceList)
  return matchingPaths.map((el) => {
    return `${sourceFolder}/${el}`
  }).filter((fullPath) => {
    const isDirectory = fsSystem.lstatSync(fullPath).isDirectory()
    return !isDirectory
  })
}

/**
 * syncFiles
 *
 * sync files from base path to destination folder
 *
 * @param filesList {Array<string>}
 * @param destinationFolder {string}
 * @param overwrite {boolean}
 * @param verbose {boolean}
 *
 * @return {Promise<int>}
 */
const syncFiles = async (filesList, destinationFolder, overwrite= false, verbose = false) => {
  let count = 0
  fs.ensureDirSync(`${ destinationFolder }`)

  for (const fileName of filesList) {
    try {
      // ensure to not copy empty or full directory
      const isDirectory = fsSystem.lstatSync(fileName).isDirectory()
      if (!isDirectory) {
        await fs.copy(fileName, `${ destinationFolder }/${ fileName }`, { overwrite: !!overwrite, errorOnExist: true })
        count++
      }
    } catch (e) {
      if (verbose) {
        console.log(`- Sync error: ${ chalk.redBright(e.message) }`);
      }
    }
  }
  return count
}

export { listFiles, filterIgnoredFiles, syncFiles }
