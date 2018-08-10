'use strict';
const logger = require('../../configs/logger.conf');
const sender = require('../../utils/sender');
const testData = require('../../data/read.test.json');
const BASEURI = require('../../data/host.json').uri;
const statusCode = 200;
const statusMessage = 'OK';
const checker = require('../../utils/checker.js');

/** The variable of amount of id will be tested */
const depth = 3;

describe(`Read tests of ${BASEURI}`, () => {
    testData.map((data) => {
        let response;
        const path = data.uri;

        before(async () => {
            data.uri = BASEURI + path;
            response = await sender(data);
            data.items = response.body.length < depth ? response.body.length : depth;
        });

        it(`Status and message of response. path:[${path}]`, () => {
            logger.info(`Checking respone's status and message. path:[${path}]`);
            checker.statusCode(response.statusCode, statusCode);
            checker.statusMessage(response.statusMessage, statusMessage);
        });

        it(`Content-type value of the responce. path:[${path}]`, () => {
            logger.info(`Checking respone's content-type value. path:[${path}]`);
            checker.contentType(response.headers['content-type'], data['content-type']);
        });

        it(`Verification the response body with schemas. path:[${path}]`, () => {
            logger.info(`Checking respone's body with schemas. path:[${path}]`);
            checker.body(data.schema, response.body);
        });

        it(`Tests of items [${path}]`, () => {
            describe(`There are [${data.items}] items`, () => {
                for (let item = 1; item <= data.items; item++) {
                    let itemResponse;
                    const itemPath = data.uri + `/${item}`;
                    before(async () => {
                        data.uri = itemPath;
                        itemResponse = await sender(data);
                    });

                    it(`Status and message of response. path:[${itemPath}]`, () => {
                        logger.info(`Checking respone's status and message. path:[${itemPath}]`);
                        checker.statusCode(itemResponse.statusCode, statusCode);
                        checker.statusMessage(itemResponse.statusMessage, statusMessage);
                    });

                    it(`Content-type value of the responce. path:[${itemPath}]`, () => {
                        logger.info(`Checking respone's content-type value. path:[${itemPath}]`);
                        checker.contentType(itemResponse.headers['content-type'], data['content-type']);
                    });

                    it(`Verification the response body with schemas. path:[${itemPath}]`, () => {
                        logger.info(`Checking respone's body with schemas. path:[${itemPath}]`);
                        checker.body(data.itemSchema, itemResponse.body);
                    });

                    it(`Verification nested resources.`, () => {
                        describe(`Verification nested Resources.`, () => {
                            data.nested.map((nest) => {
                                const nestedPath = itemPath + nest.appendix;
                                let nestedData = data;
                                let nestedResponse;
                                before(async () => {
                                    nestedData.uri = nestedPath;
                                    logger.debug("nestedData: " + JSON.stringify(nestedPath + '   ' + nestedData.uri));
                                    nestedResponse = await sender(nestedData);
                                });

                                it(`Status and message of response. path:[${nestedPath}]`, () => {
                                    logger.info(`Checking respone's status and message. path:[${nestedPath}]`);
                                    checker.statusCode(nestedResponse.statusCode, statusCode);
                                    checker.statusMessage(nestedResponse.statusMessage, statusMessage);
                                });

                                it(`Content-type value of the responce. path:[${nestedPath}]`, () => {
                                    logger.info(`Checking respone's content-type value. path:[${nestedPath}]`);
                                    checker.contentType(nestedResponse.headers['content-type'], data['content-type']);
                                });

                                it(`Verification the response body with schemas. path:[${nestedPath}]`, () => {
                                    logger.info(`Checking respone's body with schemas. path:[${nestedPath}]`);
                                    checker.body(nest.schema, nestedResponse.body);
                                });
                            });
                        });
                    });
                }
            });
        });
    });
});
