const notEmpty = require('./lib/validations/not-empty');
const numeric = require('./lib/validations/numeric');
const isMobileNumber = require('./lib/validations/is-mobile-number');
const hasLengthOf = require('./lib/validations/hasLengthOf');
const shouldBeUuid = require('./lib/validations/should-be-uuid');
const validate = require('./lib/validations/validate');
const when = require('./lib/validations/when');
const timestamp = require('./lib/validations/timestamp');
const minValue = require('./lib/validations/min-value');
const boolean = require('./lib/validations/boolean');
const isValid = require('./lib/validations/is-valid');
const isEmail = require('./lib/validations/is-email');
const bulk = require('./lib/validations/bulk');
const isStringNumeric = require('./lib/validations/is-string-numeric');

module.exports = {
    notEmpty,
    numeric,
    isEmail,
    when,
    isMobileNumber,
    validate,
    hasLengthOf,
    shouldBeUuid,
    minValue,
    timestamp,
    boolean,
    isValid,
    bulk,
    isStringNumeric
};
