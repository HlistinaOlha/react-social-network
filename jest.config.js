/** @type {import('jest').Config} */
const {defaults} = require('jest-config');

const config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
    verbose: true,
    testEnvironment: 'node',
};

module.exports = config;
