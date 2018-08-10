'use strict';
const logger = require('../../configs/logger.conf');
const sender = require('../../utils/sender');
const usersData = require('../../data/negative.test.json');
const checker = require('../../utils/checker');
const BASEURI = require('../../data/host.json').uri;

describe(`Negative tests of ${BASEURI}`, () => {
    usersData.map((data) => {
        const path = data.uri;
        before(() => {
            data.uri = BASEURI + path;
        });

        it(`Status and message of response. path:[${path}]`, async () => {
            logger.info(`Checking respone's status and message. path:[${path}]`);
            let response;
            try {
                response = await sender(data);
            } catch (error) {
                response = error.response;
            } finally {
                logger.debug(response.statusCode + ' ' + response.statusMessage);
                checker.statusCode(response.statusCode, data.statusCode);
                checker.statusMessage(response.statusMessage, data.statusMessage);
            }
        });
    });
});