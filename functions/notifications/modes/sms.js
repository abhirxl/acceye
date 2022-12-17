const Result = require('folktale/result');
const config = require('config');
// const plivo = require('plivo');
const { logInfo, logError } = require('lib/functional/logger');
const request = require('request');
const R = require('ramda');
const ConsumerSms = require('notifications/models/consumer-sms');
const SecondProviderFormatter = require('notifications/sms-formatter/second-provider-formatter');

const sendFromFirstProvider = R.curry((consumerSms) => {
    logInfo('sending sms from first provider', { consumerSms });
    const plivoRestClient = new plivo.Client(config.sms.plivo.auth_id, config.sms.plivo.auth_token);
    return new Promise((resolve) => {
        resolve('success');
        plivoRestClient.messages.create(
            consumerSms.by,
            consumerSms.to,
            consumerSms.message
        ).then((result) => {
            logInfo('Successfully sent sms from first provider', result);
            resolve(Result.Ok(result));
        }).catch((error) => {
            logError('Failed to send sms from first provider', error);
            resolve(Result.Error(error));
        });
    });
});

const sendFromSecondProvider = R.curry((consumerSms) => {
    logInfo('sending sms from second provider', { consumerSms });
    return new Promise((resolve) => {
        const url = config.sms.karix.url.replace('<mobile>', consumerSms.to)
            .replace('<message>', SecondProviderFormatter.format(consumerSms.message));
        request.post(url, (error, result) => {
            if (!error) {
                logInfo('Successfully sent sms from second provider', { to: consumerSms.to });
                resolve(Result.Ok('sent sms'));
            } else {
                logError('Failed to send sms from second provider', { error });
                resolve(Result.Error(error));
            }
        });
    });
});

module.exports.send = async (details) => {
    const consumerSms = new ConsumerSms(details.mobile, details.message);
    logInfo('Request to send sms', { details });
    return R.ifElse(
        priority => R.equals('plivo', priority),
        () => sendFromFirstProvider(consumerSms),
        () => sendFromSecondProvider(consumerSms)
    )(details.provider);
};
