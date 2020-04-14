const fs = require('fs');
const path = require('path');
const logFilePath = path.resolve('../on-covid-log.txt');

const getLoggerForStatusCode = (statusCode) => {
    if (statusCode >= 500) {
        return console.error.bind(console)
    }
    if (statusCode >= 400) {
        return console.warn.bind(console)
    }

    return console.log.bind(console)
}

const logRequestStart = (req, res, next) => {
    const timeStamp = +new Date();
    console.info(`${req.method} ${req.originalUrl}`) 
    
    const cleanup = () => {
        res.removeListener('finish', logFn)
        res.removeListener('close', abortFn)
        res.removeListener('error', errorFn)
    }

    const logRequest = (req) => {
        const durationInMS = +new Date() - timeStamp;
        const { statusCode, originalUrl } = req;
        const logInfo = [timeStamp, originalUrl, statusCode, `${durationInMS}ms`];
        fs.appendFileSync(logFilePath, logInfo.join("\t\t"));
    }

    const logFn = () => {
        cleanup()
        logRequest(req);
        const logger = getLoggerForStatusCode(res.statusCode)
        logger(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
    }

    const abortFn = () => {
        cleanup()
        logRequest(req);
        console.warn('Request aborted by the client')
    }

    const errorFn = err => {
        cleanup()
        logRequest(req);
        console.error(`Request pipeline error: ${err}`)
    }

    res.on('finish', logFn) // successful pipeline (regardless of its response)
    res.on('close', abortFn) // aborted pipeline
    res.on('error', errorFn) // pipeline internal error

    next()
}

exports.logRequestStart = logRequestStart;