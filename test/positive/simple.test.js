'use strict';
const { expect } = require('chai');
const logger = require('../../configs/logger.conf');
const sender = require('../../utils/sender');
const usersData = require('../../data/simple.test.json');
const BASEURI = require('../../data/host.json').uri;
const ajv = new require('ajv')({ allErrors: true });
const statusCode = 200;
const statusMessage = 'OK';

describe(`Tests of ${BASEURI}`, () => {
    usersData.map((data) => {
        let response;
        const path = data.uri;

        before(async () => {
            data.uri = BASEURI + path;
            response = await sender(data);
        });

        it(`Status and message of response. path:[${path}]`, () => {
            logger.info(`Checking respone's status and message. path:[${path}]`);
            expect(response.statusCode).equal(statusCode);
            expect(response.statusMessage).equals(statusMessage);
        });

        it(`Content-type value of the responce. path:[${path}]`, () => {
            logger.info(`Checking respone's content-type value. path:[${path}]`);
            expect(response.headers['content-type']).equal(data['content-type']);
        });

        it(`Verification the response body with schemas. path:[${path}]`, () => {
            logger.info(`Checking respone's body with schemas. path:[${path}]`);
            const schema = require(data.schema);
            const valid = ajv.validate(schema, response.body);
            if (!valid) {
                logger.debug(ajv.errors);
            }
            expect(valid).equal(true);
        });

    });
});