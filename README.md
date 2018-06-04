# Typescript express.js boilerplate

## About

Repo includes boilerplate with basic structure required to build REST API servers.

## Commands

### Start

For live reloading server when you write code use command for starting the server in watch mode. The server will be restarted when files in `src` directory changes.

```sh
yarn start
```

### Build

To compile app in ES5 compotable JS-code use command:

```sh
yarn compile
```

After compile in repo directory will be created `dist` folder containing JS-code.

### Start

To start compiled app just use command:
```sh
yarn start:production
```

### Tests

All app tests are located in `tests` folder.

Following command run testing tool:

```sh
yarn test
```