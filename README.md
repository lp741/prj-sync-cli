# Project Sync (prj-sync) CLI

CLI prj-sync allows you to synchronize folders and files using Gitignore configuration files like.


### Install
```bash
npm install -g prj-sync
```

### Configuration

create `.psyncrc` and `.psyncignore` follow [.gitignore](https://git-scm.com/docs/gitignore) pattern format 

### Usage

```bash
prj-sync -s example -d data-out

# or disable overwrite

prj-sync -s example -d data-out --no-w 
```

### Uninstall
```bash
npm uninstall -g prj-sync
```

### Run dev mode

```bash
npm run dev -s example -d data-out [--no-w]

pnpm dev -s example -d data-out [--no-w]

yarn dev -s example -d data-out [--no-w]
```


### Run tests

```bash
npm run test

pnpm test

yarn test
```

if you like vitest UI you can launch it by

```bash
pnpm test:ui
```

### Example
Add following files to your project root

Includes paths and files

```gitignore
#.psyncrc
.env*
DATA/**/.*
DATA/**/*
*.txt
```

Ignores sub paths and files

```gitignore
#.psyncignore
to-be-ignored.txt
DATA/folder-to-be-ignored
any-data.json
DATA/some-inside-to-be-ignored/other-data*
```

```bash
$ prj-sync -s example -d data-out -v

Reading files to sync from .psyncrc presents in example folder 

Reading files to be ignored from .psyncignore presents in example folder 

Syncing folder destination data-out 

items to be synced count 6
Folders and files to sync 
 [
  'example/.env',
  'example/DATA/some-inside-to-be-ignored/.env.local',
  'example/DATA/some-inside-to-be-ignored/.to-be-included',
  'example/DATA/sample-data.json',
  'example/DATA/some-inside-to-be-ignored/this-should-be-included.json',
  'example/other-data.txt'
] 


 items synced count 6  overwrite 

DONE ✓ 

```
