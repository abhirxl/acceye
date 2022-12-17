var validate = require('uuid-validate');

module.exports = (value) => {
    return validate(value);
};