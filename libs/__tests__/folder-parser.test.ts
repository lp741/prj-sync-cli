import {describe, it, expect, expectTypeOf} from 'vitest'
import {PRJ_SYNC_RC_FILE, PRJ_SYNC_IGNORE_FILE} from '../constants'
import {filterIgnoredFiles, listFiles, syncFiles} from '../folder-parser'
import fs from 'fs'
import glob from 'glob-promise'
import fsSystem from "fs"
import _ from 'lodash'

describe('prj-sync lib folder-parser test', () => {
    it('example folder exist', () => {
        expect(fs.existsSync(`example`)).toBeTruthy()
    })

    it(`filtered files should not be empty array from ${PRJ_SYNC_RC_FILE} content `, async () => {
        const sourcePatters = [
            '.env*',
            'DATA/**/.*',
            'DATA/**/*',
            '*.txt'
        ]
        const fileRead = await listFiles(sourcePatters, `example`)
        expectTypeOf(fileRead).toBeArray()
        expect(fileRead.length).toBeGreaterThan(0)
    })

    it(`filtered files intersected with ignore patterns should not be empty array from ${PRJ_SYNC_IGNORE_FILE} content `, async () => {
        const sourcePatters = [
            '.env*',
            'DATA/**/.*',
            'DATA/**/*',
            '*.txt'
        ]

        const ignorePatters = [
            'to-be-ignored.txt',
            'DATA/folder-to-be-ignored',
            'any-data.json',
            'DATA/some-inside-to-be-ignored/other-data*'
        ]

        const sourceFiles = await listFiles(sourcePatters, `example`)

        const fileRead = filterIgnoredFiles(sourceFiles, ignorePatters, 'example')
        expectTypeOf(fileRead).toBeArray()
        expect(fileRead.length).toBeGreaterThan(0)
    })

    it(`sync files in example directory to data-out depends on ${PRJ_SYNC_RC_FILE} and ${PRJ_SYNC_IGNORE_FILE}`, async () => {
        const sourcePatters = [
            '.env*',
            'DATA/**/.*',
            'DATA/**/*',
            '*.txt'
        ]

        const ignorePatters = [
            'to-be-ignored.txt',
            'DATA/folder-to-be-ignored',
            'any-data.json',
            'DATA/some-inside-to-be-ignored/other-data*'
        ]

        const expectedSyncedFiles = [
            'data-out-test/example/.env',
            'data-out-test/example/DATA/some-inside-to-be-ignored/.env.local',
            'data-out-test/example/DATA/some-inside-to-be-ignored/.to-be-included',
            'data-out-test/example/DATA/sample-data.json',
            'data-out-test/example/DATA/some-inside-to-be-ignored/this-should-be-included.json',
            'data-out-test/example/other-data.txt'
        ]

        const sourceFiles = await listFiles(sourcePatters, `example`)
        const fileRead = filterIgnoredFiles(sourceFiles, ignorePatters, 'example')

        fs.rmSync('data-out-test', { recursive: true, force: true })

        const syncedFiles = await syncFiles(fileRead, 'data-out-test', true, true)
        expect(syncedFiles).toBe(6)


        // retrieve generated data-out-test folder files and filter folders
        const list = []
        list.push(...await glob('data-out-test/**', {
            // Adds a / character to directory matches.
            mark: true,
        }))
        list.push(...await glob('data-out-test/**/.*', {
            // Adds a / character to directory matches.
            mark: true,
        }))

        const dataTestFiles = list.filter((fullPath) => {
            const isDirectory = fsSystem.lstatSync(fullPath).isDirectory()
            return !isDirectory
        })

        dataTestFiles.sort()
        expectedSyncedFiles.sort()

        expect(_.isEqual(dataTestFiles, expectedSyncedFiles)).toBe(true)

        fs.rmSync('data-out-test', { recursive: true, force: true })
    })
})
