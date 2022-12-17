const { logError } = require('lib/functional/logger');
const config = require('config');
const standardize = (mobile) => {
    if (mobile.length === 10) {
        return (`+91${mobile}`);
    } if (mobile.length === 12 && mobile.startsWith('91')) {
        return (`+${mobile}`);
    } if (mobile.length === 13 && mobile.startsWith('+91')) {
        return (mobile);
    }
    logError("Sms can't be sent because number is invalid", mobile);
};

module.exports = class ConsumerSms {
    constructor(to, message, priority) {
        this.by = config.sms.karix.mobile;
        this.to = standardize(to);
        this.message = message;
        this.priority = priority;
    }
};
