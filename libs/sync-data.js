import chalk from "chalk"
import { PRJ_SYNC_IGNORE_FILE, PRJ_SYNC_RC_FILE } from "./constants.js"
import { parseConfigFile } from "./config-parser.js"
import { filterIgnoredFiles, listFiles, syncFiles } from "./folder-parser.js"

/**
 *
 * @param options {{ sourceFolder: string, destinationFolder: string, verbose: boolean, overwrite: boolean }}
 * @returns {Promise<void>}
 */
async function execute (options) {
  // Reading config file
  console.log(`Reading files to sync from ${ chalk.green.bold(PRJ_SYNC_RC_FILE) } presents in ${ chalk.blueBright(options.sourceFolder) } folder`, "\n");
  const readList = parseConfigFile(`${options.sourceFolder}/${PRJ_SYNC_RC_FILE}` )

  console.log(`Reading files to be ignored from ${ chalk.green.bold(PRJ_SYNC_IGNORE_FILE) } presents in ${ chalk.blueBright(options.sourceFolder) } folder`, "\n");
  const ignoreList = parseConfigFile(`${options.sourceFolder}/${PRJ_SYNC_IGNORE_FILE}` )

  // Sync files and folder to destination
  console.log(`Syncing folder ${ chalk.green.bold('destination') } ${ chalk.blueBright(options.destinationFolder) }`, "\n");
  const fileList = await listFiles(readList, options.sourceFolder)
  const filteredList = filterIgnoredFiles(fileList, ignoreList)

  console.log(`items to be synced count ${chalk.blueBright(filteredList.length)}`)

  if (options.verbose) {
    console.log('Folders and files to sync', "\n", filteredList);
  }

  const fullPathFilteredFiles = filteredList.map((el) => {
    return `${options.sourceFolder}/${el}`
  })

  const syncedFiles = await syncFiles(fullPathFilteredFiles, options.destinationFolder, options.overwrite)

  console.log(`items synced count ${chalk.blueBright(syncedFiles)} ${options.overwrite ? chalk.redBright(' overwrite') : ''}`)
}

export { execute }
