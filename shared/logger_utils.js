'use strict';

const pino = require('pino');
const pretty = require('pino-pretty');

const logger = pino(
    { level: 'debug' },
    pretty({
        sync: true,
        colorize: true,
        translateTime: 'mm-dd-yyyy:HH-MM:ss'
    })
);

module.exports = logger;
