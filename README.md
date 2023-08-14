# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker + docker compose - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone https://github.com/xzfantom/nodejs2022Q4-service
git switch task2
```

## Preparation

Rename .env.example to .env

## Running application

```
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

To get OpenAPI in json format open http://localhost:4000/doc-json
To get OpenAPI in yaml format open http://localhost:4000/doc/yaml

You can change port by copying .env.example file to .env file and changing variable PORT to new value

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
