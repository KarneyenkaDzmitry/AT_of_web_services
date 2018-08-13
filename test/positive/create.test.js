'use strict';
const logger = require('../../configs/logger.conf');
const sender = require('../../utils/sender');
const testData = require('../../data/create.test.json');
const BASEURI = require('../../data/host.json').uri;
const checker = require('../../utils/checker.js');

describe(`Positive create (method: POST) tests of ${BASEURI} service`, () => {
    testData.map((data) => {
        let response;
        const path = data.uri;
        const info = `${data.method}, ${path}`;

        before(async () => {
            data.uri = BASEURI + data.uri;
            response = await sender(data);
        });

        it(`[${info}]. Status and message of response.`, () => {
            checker.statusCode(response.statusCode, data.statusCode);
            checker.statusMessage(response.statusMessage, data.statusMessage);
        });

        it(`[${info}]. Content-type value of the responce.`, () => {
            checker.contentType(response.headers['content-type'], data['content-type']);
        });

        it(`[${info}]. Verification the response body with schemas`, () => {
            checker.body(data.itemSchema, response.body);
            logger.debug(response.body);
        });

        it(`[${info}]. Verification the response bodyValues.`, () => {
            checker.bodyValues(data.body, response.body);
        });
    });
});