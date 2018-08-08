'use strict';
const { expect } = require('chai');
const logger = require('../../configs/logger.conf');
const sender = require('../../utils/sender');
const usersData = require('../../data/negative.test.json');
const BASEURI = require('../../data/host.json').uri;

/* eslint-disable */
const statusMessage = 'Not Found';
/* eslint-enable */

describe(`Tests of ${BASEURI}`, () => {
    usersData.map((data) => {
        const path = data.uri;
        const statusCode = data.statusCode;
        before(() => {
            data.uri = BASEURI + path;
        });

        it(`Status and message of response. path:[${path}]`, async () => {
            logger.info(`Checking respone's status and message. path:[${path}]`);
            let response;
            try {
                response = await sender(data);
            } catch (error) {
                response = error;
            } finally {
                logger.debug(response.statusCode);
                expect(response.statusCode).equals(statusCode);
            }
        });
    });
});