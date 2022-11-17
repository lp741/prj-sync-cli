#!/usr/bin/env node
import chalk from "chalk"
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { execute } from "../libs/sync-data.js"

const options = yargs(hideBin(process.argv))
  .usage('Usage: prj-sync [-s <source-folder>] -d <destination-forder>')
  .command('prj-sync', 'Sync project envs and data, add .psyncrc and .psyncignore to your project root.')
  .example('prj-sync -s ./example -d ~/Works/DATA/MyProject', 'Sync project envs and data with files present in output folder, or create if they don\'t exists')
  .option('sourceFolder', {
    alias: 's',
    describe: 'Source folder',
    default: '.'
  })
  .option('destinationFolder', {
    alias: 'd',
    describe: 'Destination folder',
    demandOption: true
  })
  .option('verbose', {
    alias: 'v',
    describe: 'Verbose',
    default: false,
    type: 'boolean'
  })
  .option('overwrite', {
    alias: 'w',
    describe: 'Overwrite',
    default: true,
    type: 'boolean'
  })
  .epilog('copyright 2022')
  .argv;

try {
  await execute(options)
  // print report
  console.log(chalk.yellowBright.bold('DONE'), chalk.greenBright.bold('✓'), "\n");
} catch (e) {
  console.error(e)
  console.log(chalk.yellowBright.bold('FAILED'), chalk.redBright.bold('X'), "\n");
}


