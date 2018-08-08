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
            const valid = ajv.validate(require(data.schema), response.body);
            if (!valid) {
                logger.debug(ajv.errors);
            }
            expect(valid).equal(true);
        });
        it(`Test of items ${path}`, () => {

            describe(`Tests of items ${path}`, () => {
                (response.body).map((item, index) => {
                    if (index < 10) {
                        let itemResponse;
                        const itemPath = data.uri + `/${item.id}`;

                        before(async () => {
                            data.uri = itemPath;
                            itemResponse = await sender(data);
                        });

                        it(`Status and message of response. path:[${itemPath}]`, () => {
                            logger.info(`Checking respone's status and message. path:[${itemPath}]`);
                            expect(itemResponse.statusCode).equal(statusCode);
                            expect(itemResponse.statusMessage).equals(statusMessage);
                        });

                        it(`Content-type value of the responce. path:[${itemPath}]`, () => {
                            logger.info(`Checking respone's content-type value. path:[${itemPath}]`);
                            expect(itemResponse.headers['content-type']).equal(data['content-type']);
                        });

                        it(`Verification the response body with schemas. path:[${itemPath}]`, () => {
                            logger.info(`Checking respone's body with schemas. path:[${itemPath}]`);
                            const valid = ajv.validate(require(data.itemSchema), itemResponse.body);
                            if (!valid) {
                                logger.debug(ajv.errors);
                            }
                            expect(valid).equal(true);
                        });
                    }
                });
            });
        });
    });
});