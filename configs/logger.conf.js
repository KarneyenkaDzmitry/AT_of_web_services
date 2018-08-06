'use strict';
const { configure, getLogger } = require('log4js');

configure({
    appenders: {
        error: { type: 'file', filename: './logs/error.log' },
        combine: { type: 'file', filename: './logs/combine.log' },
        out: { type: 'stdout' }
    },
    categories: {
        default: { appenders: ['error'], level: 'error' },
        stdout: { appenders: ['combine', 'out'], level: 'debug' }
    }
});
const logger = getLogger(['stdout', 'default']);
logger.debug("Some debug messages");
logger.info("Some info messages");
module.exports = logger;