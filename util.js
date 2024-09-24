var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { BigNumber } from 'bignumber.js';
export var DIGIT = '9';
export var ALPHA = 'A';
export var ALPHANUM = 'S';
export var HOURS = 'H';
export var MINUTES = 'm';
export var SECONDS = 's';
function addPlaceholder(output, index, placeholder) {
    for (var newIndex = index; newIndex < output.length; newIndex++) {
        if (output[newIndex] === DIGIT ||
            output[newIndex] === ALPHA ||
            output[newIndex] === ALPHANUM) {
            output[newIndex] = placeholder;
        }
    }
    return output;
}
function toPattern(value, optionPattern) {
    var pattern = typeof optionPattern === 'object'
        ? optionPattern.pattern
        : optionPattern;
    var patternChars = pattern.replace(/\W/g, '');
    var output = pattern.split('');
    var values = value.toString().replace(/\W/g, '');
    var charsValues = values.replace(/\W/g, '');
    var placeholder = typeof optionPattern === 'object'
        ? optionPattern.placeholder
        : undefined;
    var charCounter = 0;
    var index;
    var outputLength = output.length;
    for (index = 0; index < outputLength; index++) {
        if (charCounter >= values.length) {
            if (patternChars.length === charsValues.length) {
                return output.join('');
            }
            if (placeholder !== undefined &&
                patternChars.length > charsValues.length) {
                return addPlaceholder(output, index, placeholder).join('');
            }
            break;
        }
        else if ((output[index] === DIGIT && values[charCounter].match(/[0-9]/)) ||
            (output[index] === ALPHA &&
                values[charCounter].match(/[a-zA-Z]/)) ||
            (output[index] === ALPHANUM &&
                values[charCounter].match(/[0-9a-zA-Z]/)) ||
            (output[index] === HOURS && values[charCounter].match(/[0-23]/)) ||
            (output[index] === MINUTES &&
                values[charCounter].match(/[0-59]/)) ||
            (output[index] === SECONDS && values[charCounter].match(/[0-59]/))) {
            output[index] = values[charCounter++];
        }
        else if (output[index] === DIGIT ||
            output[index] === ALPHA ||
            output[index] === ALPHANUM ||
            output[index] === HOURS ||
            output[index] === MINUTES ||
            output[index] === SECONDS) {
            if (placeholder !== undefined) {
                return addPlaceholder(output, index, placeholder).join('');
            }
            return output.slice(0, index).join('');
        }
        else if (output[index] === values[charCounter]) {
            charCounter++;
        }
    }
    return output.join('').substr(0, index);
}
function unMask(value, type) {
    if (type === void 0) { type = 'custom'; }
    if (type === 'currency') {
        if (!value)
            return '0';
        var unMaskedValue = value.replace(/\D/g, '');
        var number = parseInt(unMaskedValue.trimStart());
        return number.toString();
    }
    return value.replace(/\W/g, '');
}
function masker(value, pattern, options) {
    var autoCapitalize = options.autoCapitalize;
    var sentence = toPattern(value, __assign({ pattern: pattern }, options));
    switch (autoCapitalize) {
        case 'characters':
            sentence = sentence.toUpperCase();
            break;
        case 'words':
            sentence = sentence.replace(/(?:^|\s)\S/g, function (text) {
                return text.toUpperCase();
            });
            break;
        case 'sentences': {
            var lower = sentence.toLowerCase();
            sentence = lower.charAt(0).toUpperCase() + lower.substring(1);
            break;
        }
    }
    return sentence;
}
function currencyMasker(value, options) {
    if (value === void 0) { value = '0'; }
    var prefix = options.prefix, decimalSeparator = options.decimalSeparator, groupSeparator = options.groupSeparator, precision = options.precision, groupSize = options.groupSize, secondaryGroupSize = options.secondaryGroupSize, fractionGroupSeparator = options.fractionGroupSeparator, fractionGroupSize = options.fractionGroupSize, suffix = options.suffix;
    var precisionDivider = parseInt(1 + '0'.repeat(precision || 0));
    var number = parseInt(value) / precisionDivider;
    var formatter = {
        prefix: prefix,
        decimalSeparator: decimalSeparator,
        groupSeparator: groupSeparator,
        groupSize: groupSize || 3,
        secondaryGroupSize: secondaryGroupSize,
        fractionGroupSeparator: fractionGroupSeparator,
        fractionGroupSize: fractionGroupSize,
        suffix: suffix,
    };
    var bigNumber = new BigNumber(number);
    BigNumber.config({ FORMAT: formatter });
    return bigNumber.toFormat(precision);
}
function dateMasker(value, options) {
    if (value === void 0) { value = ''; }
    var _a = options.dateFormat, dateFormat = _a === void 0 ? 'yyyy/mm/dd' : _a;
    var regex = /[a-zA-Z]/gi;
    var pattern = dateFormat.replaceAll(regex, '9');
    return masker(value, pattern, {});
}
function timeMasker(value, options) {
    if (value === void 0) { value = ''; }
    var _a = options.timeFormat, timeFormat = _a === void 0 ? 'HH:mm:ss' : _a;
    var pattern = timeFormat;
    return masker(value, pattern, {});
}
function multimasker(value, patterns, options) {
    return masker(value, patterns.reduce(function (memo, pattern) {
        return value.length <= unMask(memo).length ? memo : pattern;
    }, patterns[0]), options);
}
function mask(value, pattern, type, options, autoCapitalize) {
    if (pattern === void 0) { pattern = ''; }
    if (type === void 0) { type = 'custom'; }
    if (type === 'currency') {
        return currencyMasker(String(value), options);
    }
    if (type === 'date') {
        return dateMasker(String(value), options);
    }
    if (type === 'time') {
        return timeMasker(String(value), options);
    }
    if (typeof pattern === 'string') {
        return masker(String(value), pattern || '', {
            autoCapitalize: autoCapitalize,
        });
    }
    return multimasker(String(value), pattern, {});
}
export { mask, unMask, currencyMasker };
