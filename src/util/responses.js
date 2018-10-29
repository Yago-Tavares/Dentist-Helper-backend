let httpStatusCodes = require('http-status-codes');

const responses = (function() {
    const badRequest = function (message) {
        return {
            status: httpStatusCodes.BAD_REQUEST,
            message: message
        };
    };
    const unauthorized = function (message) {
        return {
            status: httpStatusCodes.UNAUTHORIZED,
            message: message
        };
    };
    const conflict = function (message) {
        return {
            status: httpStatusCodes.CONFLICT,
            message: message
        };
    };
    const created = function (message, data) {
        return {
            status: httpStatusCodes.CREATED,
            data: data,
            message: message
        };
    };
    const notFound = function (message) {
        return {
            status: httpStatusCodes.NOT_FOUND,
            message: message
        };
    };
    const internalError = function () {
        return {
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            message: 'INTERNAL_ERROR'
        };
    };
    const ok = function (message, data) {
        return {
            status: httpStatusCodes.OK,
            message: message,
            data: data
        };
    };
    const notModified = function (message) {
        return {
            status: httpStatusCodes.NOT_MODIFIED,
            message: message
        };
    };

    return {
        notModified,
        ok,
        internalError,
        notFound,
        created,
        conflict,
        unauthorized,
        badRequest
    }

})();


module.exports  = responses;