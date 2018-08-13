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

describe(`Read tests (method GET) of ${BASEURI}`, () => {
    testData.map((data) => {
        let response;
        const path = data.uri;
        const info = `${data.method}, ${path}`;

        before(async () => {
            data.uri = BASEURI + path;
            response = await sender(data);
            data.items = response.body.length < depth ? response.body.length : depth;
        });

        it(`[${info}]. Status and message of response.`, () => {
            checker.statusCode(response.statusCode, statusCode);
            checker.statusMessage(response.statusMessage, statusMessage);
        });

        it(`[${info}]. Content-type value of the responce.`, () => {
            checker.contentType(response.headers['content-type'], data['content-type']);
        });

        it(`[${info}]. Verification the response body with schemas.`, () => {
            checker.body(data.schema, response.body);
        });

        it(`[${data.method}, [${path}/:id]. Tests of read first [${data.items}] elements data by id.`, () => {
            describe(`[${data.method}, [${path}/:id]. Tests of read first [${data.items}] elements data by id.`, () => {
                for (let item = 1; item <= data.items; item++) {
                    let itemResponse;
                    const itemPath = data.uri + `/${item}`;
                    const itemInfo = `${data.method}, ${path}/${item}`;
                    before(async () => {
                        data.uri = itemPath;
                        itemResponse = await sender(data);
                    });

                    it(`[${itemInfo}]. Status and message of response.`, () => {
                        checker.statusCode(itemResponse.statusCode, statusCode);
                        checker.statusMessage(itemResponse.statusMessage, statusMessage);
                    });

                    it(`[${itemInfo}]. Content-type value of the responce.`, () => {
                        checker.contentType(itemResponse.headers['content-type'], data['content-type']);
                    });

                    it(`[${itemInfo}]. Verification the response body with schemas.`, () => {
                        checker.body(data.itemSchema, itemResponse.body);
                    });

                    it(`Verification nested paths. Example: [${itemInfo}/:resource(/comments, /posts...)]`, () => {
                        describe(`Verification nested paths. Example: [${itemInfo}/:resource(comments, posts...)]`, () => {
                            data.nested.map((nest) => {
                                const nestedPath = itemPath + nest.appendix;
                                let nestedData = data;
                                let nestedResponse;
                                const nestedInfo = `${data.method}, ${path}/${item}${nest.appendix}`;

                                before(async () => {
                                    nestedData.uri = nestedPath;
                                    logger.debug("nestedData: " + JSON.stringify(nestedPath + '   ' + nestedData.uri));
                                    nestedResponse = await sender(nestedData);
                                });

                                it(`[${nestedInfo}]. Status and message of response.`, () => {
                                    checker.statusCode(nestedResponse.statusCode, statusCode);
                                    checker.statusMessage(nestedResponse.statusMessage, statusMessage);
                                });

                                it(`[${nestedInfo}]. Content-type value of the responce.`, () => {
                                    checker.contentType(nestedResponse.headers['content-type'], data['content-type']);
                                });

                                it(`[${nestedInfo}]. Verification the response body with schemas.`, () => {
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
