// Karma configuration
// Generated on Sat Jul 11 2020 16:51:00 GMT+0700 (GMT+07:00)
const path = require('path');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['chai', 'jasmine', 'karma-typescript'],
        files: [
            'tests/**/*.test.ts',
            'src/RangeSlider/**/*.ts'
        ],
        preprocessors: {
            'tests/**/*.test.ts': ['karma-typescript', 'sourcemap'/* , 'coverage' */],
            'src/RangeSlider/**/*.ts': ['karma-typescript', 'sourcemap', 'coverage'],
        },
        reporters: ['kjhtml', 'coverage', 'karma-typescript'],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
}