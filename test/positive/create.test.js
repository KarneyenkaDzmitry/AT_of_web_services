'use strict';
const logger = require('../../configs/logger.conf');
const sender = require('../../utils/sender');
const testData = require('../../data/create.test.json');
const BASEURI = require('../../data/host.json').uri;
const checker = require('../../utils/checker.js');

describe(`Positive create tests of ${BASEURI} service`, () => {
    testData.map((data) => {
        let response;
        const path = data.uri;

        before(async () => {
            data.uri = BASEURI + path;
            response = await sender(data);
        });

        it(`Status and message of response. path:[${path}]`, () => {
            logger.info(`Checking respone's status and message. path:[${path}]`);
            checker.statusCode(response.statusCode, data.statusCode);
            checker.statusMessage(response.statusMessage, data.statusMessage);
        });

        it(`Content-type value of the responce. path:[${path}]`, () => {
            logger.info(`Checking respone's content-type value. path:[${path}]`);
            checker.contentType(response.headers['content-type'], data['content-type']);
        });

        it(`Verification the response body with schemas. path:[${path}]`, () => {
            logger.info(`Checking respone's body with schemas. path:[${path}]`);
            checker.body(data.itemSchema, response.body);
            logger.debug(response.body);
        });

        it(`Verification the response bodyValues. path:[${path}]`, () => {
            logger.info(`Verification the response bodyValues. path:[${path}]`);
            checker.bodyValues(data.body, response.body);
            logger.debug(response.body);
        });
    });
});