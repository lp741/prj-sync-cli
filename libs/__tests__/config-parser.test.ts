import { describe, it, expect, expectTypeOf } from 'vitest'
import { PRJ_SYNC_RC_FILE, PRJ_SYNC_IGNORE_FILE } from '../../libs/constants.js'
import { parseConfigFile } from "../../libs/config-parser.js"
import fs from 'fs'

describe('prj-sync lib config-parser test', () => {
  it('example folder exist', () => {
    expect(fs.existsSync(`example/${PRJ_SYNC_RC_FILE}`)).toBeTruthy()
    expect(fs.existsSync(`example/${PRJ_SYNC_IGNORE_FILE}`)).toBeTruthy()
  })

  it(`${PRJ_SYNC_RC_FILE} file in example folder parsing return array of paths`, () => {
    const fileRead = parseConfigFile(`example/${PRJ_SYNC_RC_FILE}`)
    expectTypeOf(fileRead).toBeArray()
  })

  it(`${PRJ_SYNC_IGNORE_FILE} file in example folder parsing return array of paths`, () => {
    const fileRead = parseConfigFile(`example/${PRJ_SYNC_IGNORE_FILE}`)
    expectTypeOf(fileRead).toBeArray()
  })
})
