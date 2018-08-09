'use strict';

const { expect } = require('chai');
const logger = require('../configs/logger.conf');
const ajv = new require('ajv')({ allErrors: true });

class Checker {
    statusCode(expected, actual) {
        return expect(actual).equal(expected);
    }

    statusMessage(expected, actual) {
        return expect(actual).equal(expected);
    }

    contentType(expected, actual) {
        return expect(actual).equal(expected);
    }

    body(expected, actual) {
        const valid = ajv.validate(require(expected), actual);
        if (!valid) {
            logger.debug(ajv.errors);
        }
        return expect(valid).equal(true);
    }
}

module.exports = new Checker();