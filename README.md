# Project Sync (prj-sync) CLI

command line script to copy and sync environments configuration and local data of development projects


### Install
```
npm install -g .
```

### Usage

```
prj-sync
```

### Uninstall
```
npm uninstall -g prj-sync
```

### Run dev mode

```
npm run dev

pnpm dev

yarn dev
```


### Run tests

```
npm run test

pnpm test

yarn test
```


### Configuration

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


### Usage

```bash
prj-sync -s example -d data-out

# or disable overwrite

prj-sync -s example -d data-out --no-w 
```
