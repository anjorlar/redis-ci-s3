# redis-ci-s3

This repository is for exploring node concepts for development and production deployment. This is a full-Stack node/react blog application with react-client, node/express server and MongoDB.

## Changelog

- **Make sure to setup your keys in a `.env` file in root**
- **Make sure to run `yarn add` to install all dependencies**
- Run scripts with:
  - `yarn dev`
  - `yarn build`
  - `yarn start`

### `Updates in `server``

- Upgrade all dependencies to latest
- Switch to using `yarn` instead of `npm`
  - `package-json.lock` > `yarn.lock`
- Required versions set in `package.json`:
  - `yarn`: `^1.17.0`
  - `node`: `^12.7.0`
- Add support for `module-alias` to allow aliasing of modules in `require()`
- Switch to `.env` files for managing keys
- Remove semicolons in `.js`
- Add `nodemon.json` for Nodemon settings
  - Add ignore for changes in `client` (already handled by CRA)
- `Blog` Schema
  - `createdAt` > `created`

### `Updates in `client``

- Upgrade all dependencies to latest
- Switch to using `yarn` instead of `npm`
  - `package-json.lock` > `yarn.lock`
- Required versions set in `package.json`:
  - `yarn`: `1.17.0`
  - `node`: `12.7.0`
- Add `jsconfig.json` to support module path alias directly starting from `src`
- Remove semicolons in `.js`