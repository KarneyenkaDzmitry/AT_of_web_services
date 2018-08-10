# AT_of_web_services version 1.1.0 ([AT Lab#19])

The framework tests rest api of servise - [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) <br>

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
#### $ npm report

## Notes

#### If the body of request is empty I suppose to receive request with: <br> 
#### statusCode: "400" and statusMessage: "Bad Request"

#### If the body of request contains not propriate property I suppose to receive request with: <br>
#### statusCode: "400" and statusMessage: "Bad Request"

#### If the body of request is string I suppose to receive request with: <br>
#### statusCode: "400" and statusMessage: "Bad Request"

#### If I sent request with not existing path I suppose to receive request with: <br>
#### statusCode: "404" and statusMessage: "Not Found"

#### If I sent request with not implemented method (UPDATE, OPTION) path I suppose to receive request with: <br>
#### statusCode: "400" and statusMessage: "Bad Request"

#### If I sent request with not suitable method for existing path () I suppose to receive request with: <br>
#### statusCode: "404" and statusMessage: "Not Found"
#### Examples: PUT for path - /users; POST for path - /users/1; PATCH for path - users


### Author
#### Dzmitry_Karneyenka, Republic of Belarus, Minsk
