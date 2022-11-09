import ignore from 'ignore'
import glob from 'glob-promise'
import fs from 'fs-extra'

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
 *
 * @returns {Array<String>}
 */
const filterIgnoredFiles = (sourceList, pattern) => {
  const patters = []
  if (!Array.isArray(pattern)) {
    patters.push(pattern)
  } else {
    patters.push(...pattern)
  }

  return ignore().add(patters).filter(sourceList)
}

/**
 * syncFiles
 *
 * sync files from base path to destination folder
 *
 * @param filesList {Array<string>}
 * @param destinationFolder {string}
 * @param overwrite {boolean}
 *
 * @return {Promise<int>}
 */
const syncFiles = async (filesList, destinationFolder, overwrite= false) => {
  let count = 0
  for (const fileName of filesList) {
    try {
      await fs.copy(fileName, `${ destinationFolder }/${ fileName }`, { overwrite: !!overwrite, errorOnExist: true })
      count++
    } catch (e) {
      console.error(e)
    }
  }
  return count
}

export { listFiles, filterIgnoredFiles, syncFiles }
