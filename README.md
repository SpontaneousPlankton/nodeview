[![Build Status](https://travis-ci.org/SpontaneousPlankton/AppButler.svg?branch=master)](https://travis-ci.org/SpontaneousPlankton/AppButler)
# Butler
Butler provides an intuitive drag-and-drop UI for designing server architecture. It will generate a boilerplate from your configuration and send your files to github. Then clone your new repo and start coding!

Note:Butler currently only supports express.js servers.

<hr>

## Team

  - __Product Owner__: Reid Greer
  - __Scrum Master__: Sofia Berlin
  - __Development Team Members__: [Dylan Kuang](https://github.com/dylanksup), [Jeremy Rosenfeld](https://github.com/jeremyir), [Reid Greer](https://github.com/jreidgreer), [Sofia Berlin](https://github.com/sofiamay)

<hr>
## Table of Contents

1. [Usage](#Usage)
1. [Features](#Features)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Contributing](#contributing)
1. [Architecture](#architecture)
1. [API](#api)
1. [Deployment](#deployment)

<hr>

## Usage

1. Navigate your browser to appButler.io.
2. Login with Github. AppButler needs github authorization to create a new repo.
3. Drag and drop components until you are satisfied with your server architecture.
4. Click build to generate your boilerplate
5. Start coding!

<hr>

## Features
1. Support for express.js server generation
1. Integration with Github 
1. An intuitive UI to help you visualize and design your server architecture
1. Ability to save and return to past server configurations


<hr>

## Requirements

- Node >= 5.0.x < 6 
- Express 
- Mongo 3.2.x
  - Mongoose 4.4.x
- React
- Redux 

<hr>

## Development

### Installing Dependencies
From within the root directory:

```sh
npm install
npm run build
```

## Contributing + Github Workflow

See [contributing.md](contributing.md) for contribution and github workflow guidelines.

<hr>

## Architecture
### High Level Architecture
![](http://i.imgur.com/fhjGcPf.png)
### Database
![](http://i.imgur.com/iWL202V.png?1)

<hr>

## API

| Method | Route      | Description                                    |
|--------|------------|------------------------------------------------|
| POST   | api/serve  | Generates a boilerplate and sends it to github |
| GET    | api/config | Get current user's configs from the database   |
| POST   | api/serve  | Generates a new config                         |
| POST   | api/config | Saves a user's config to the database          |
| DELETE | agi/config | Delete's a user's config                       |
| POST   | api/login  | Logs in user through Github                    |
| GET    | api/users  | Get current user from the database             |

