'use strict';

const { expect } = require('chai');
const logger = require('../configs/logger.conf');
const ajv = new require('ajv')({ allErrors: true });

module.exports = {
    statusCode(expected, actual) {
        return expect(expected).equal(actual);
    },

    statusMessage(expected, actual) {
        return expect(expected).equal(actual);
    },

    contentType(expected, actual) {
        return expect(expected).equal(actual);
    },

    body(expected, actual) {
        const valid = ajv.validate(require(expected), actual);
        if (!valid) {
            logger.debug(ajv.errors);
        }
        return expect(valid).equal(true);
    },

    bodyValues(expected, actual) {
        Object.keys(expected).forEach((key) => {
            logger.debug(`Expected [${expected[key]}], but actual [${actual[key]}]`);
            /* eslint-disable */
            typeof (expected[key]) === "object" ? this.bodyValues(expected[key], actual[key]) : expect(expected[key]).equals(actual[key]);
            /* eslint-enable */
        });
    }
};