'use strict';
const { expect } = require('chai');
const logger = require('../configs/logger.conf');
const request = require('request-promise-native');
const options = {
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'GET',
    resolveWithFullResponse: true,
    json: true
};

describe('Tests of https://jsonplaceholder.typicode.com/users', () => {
    logger.info('Get started!');
    let response;

    before(async () => {
        logger.info('Is making request to service');
        try {
            response = await request(options);
        } catch (error) {
            logger.error('Was catching error during receiving response', error);
        }
        /* eslint-disable */
        //console.log(response);
        /* eslint-enable */
    });
    it('Status and message of response', () => {
        logger.info('Checking respone`s status and message');
        expect(response.statusCode).equal(200);
        expect(response.statusMessage).equals('OK');
    });

    it('Content-type value of the responce', () => {
        logger.info('Checking respone`s content-type value');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
    });

    it('Verification the response body', () => {
        logger.info('Checking respone`s body');
        expect(response.body.length).equal(10);
    });
});