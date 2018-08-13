'use strict';
const logger = require('../../configs/logger.conf');
const sender = require('../../utils/sender');
const usersData = require('../../data/negative.test.json');
const checker = require('../../utils/checker');
const BASEURI = require('../../data/host.json').uri;

describe(`Negative (wrong: path, body; not implemented method) tests of ${BASEURI}`, () => {
    usersData.map((data) => {
        const path = data.uri;
        let response;
        const info = `${data.method}, ${path}`;

        before(async () => {
            data.uri = BASEURI + path;
            response = await sender(data);
        });

        it(`[${info}]. Status and message of response.`, async () => {
            logger.info(`Checking respone's status and message. path:[${path}]`);
            checker.statusCode(response.statusCode, data.statusCode);
            checker.statusMessage(response.statusMessage, data.statusMessage);
            logger.debug(response.statusCode + ' ' + response.statusMessage);
        });
    });
});