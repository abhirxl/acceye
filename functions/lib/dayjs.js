const dayjs = require('dayjs');
const isToday = require('dayjs/plugin/isToday');
const isTomorrow = require('dayjs/plugin/isTomorrow');
const isYesterday = require('dayjs/plugin/isYesterday');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const utc = require('dayjs/plugin/utc');
const tz = require('dayjs/plugin/timezone');

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(tz);

module.exports = dayjs;