const R = require('ramda');
const logger = require('lib/logger');
const Maybe = require('folktale/maybe');
const Result = require('folktale/result');

const fromMayBe = (maybe) => {
    let value;
    if (Maybe.hasInstance(maybe)) value = maybe.getOrElse({});
    else value = maybe;
    return value;
};

const logError = R.curry((message, value) => {
    let error = fromMayBe(value);
    logger.error(message, error);
    return Result.Ok('Successfully logged error message');
});

const logInfo = R.curry((message, value) => {
    logger.info(message, fromMayBe(value));
    return Result.Ok('Successfully logged info message');
});

const logDebug = R.curry((message, value) => {
    logger.debug(message, { data: fromMayBe(value) });
    return Result.Ok('Successfully logged debug message');
});

module.exports.logError = logError;
module.exports.logInfo = logInfo;
module.exports.logDebug = logDebug;
