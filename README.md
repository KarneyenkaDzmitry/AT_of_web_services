# AT_of_web_services version 1.1.0 ([AT Lab#19])

## The framework tests rest api of servise - [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) <br>

## Implementation

### Dependencies

The application needs to have the following dependencies:
1. npm --version 6.1.0
2. node --version 8.11.3

### Deploy

#### $ npm install

Before start the program is supposed to run the command [npm install].<br> 
It downloads needed modules and prepars the programm for start.<br>
There is a list of modules and their versions:

* "ajv": "^6.5.2",
* "chai": "^4.1.2",
* "eslint": "^5.2.0",
* "log4js": "^3.0.4",
* "mocha": "^5.2.0",
* "mochawesome": "^3.0.3",
* "request": "^2.87.0",
* "request-promise-native": "^1.0.5"

## Usage

For running tests execute command:
#### $ npm test
For checking codestyle with linter:
#### $ npm run lint
For running report :
#### $ npm run report

## Notes

If the body of request is empty I suppose to receive request with: <br> 
statusCode: "400" and statusMessage: "Bad Request"<br> 
<br> 
If the body of request contains not propriate property I suppose to receive request with: <br>
statusCode: "400" and statusMessage: "Bad Request"<br> 
<br> 
If the body of request is string I suppose to receive request with: <br>
statusCode: "400" and statusMessage: "Bad Request"<br> 
<br> 
If I sent request with not existing path I suppose to receive request with: <br>
statusCode: "404" and statusMessage: "Not Found"<br> 
<br> 
If I sent request with not implemented method (UPDATE, OPTION) path I suppose to receive request with: <br>
statusCode: "400" and statusMessage: "Bad Request"<br> 
<br> 
If I sent request with not suitable method for existing path () I suppose to receive request with: <br>
statusCode: "404" and statusMessage: "Not Found"<br> 
Examples: PUT for path - /users; POST for path - /users/1; PATCH for path - /users<br> 

## Structure of the framework

Folders: 
- configs - there is config file for logger which based on lof4js module. [logger config](https://github.com/KarneyenkaDzmitry/AT_of_web_services/tree/master/configs)
- data -  there are located json files with test data. [test data](https://github.com/KarneyenkaDzmitry/AT_of_web_services/tree/master/data)
- data/schema - there are test schemas for testing body of response. Schemas based on ajv module. [schemas](https://github.com/KarneyenkaDzmitry/AT_of_web_services/tree/master/data/schemas)
- test - home folder for all tests and config file for mocha. [mocha.opt](https://github.com/KarneyenkaDzmitry/AT_of_web_services/blob/master/test/mocha.opts)
- test/positive - there are positive tests. [positive tests](https://github.com/KarneyenkaDzmitry/AT_of_web_services/tree/master/test/positive)
- test/negative - there are negative tests. [negative tests](https://github.com/KarneyenkaDzmitry/AT_of_web_services/tree/master/test/negative)
- utils - it is folder for helpfull modules. [utils](https://github.com/KarneyenkaDzmitry/AT_of_web_services/tree/master/utils)

In addition after install are created two folders:
- logs - there are save logger's files: combine.log and error.log.
- reports - all data for reports stored here.

### Author
#### Dzmitry_Karneyenka, Republic of Belarus, Minsk
