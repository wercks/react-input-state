var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var isCpf = function (content) {
    if (!content)
        return false;
    content = content.replace(/\D+/g, '');
    if (content.length != 11)
        return false;
    var pesoCPF = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    var calc = function (str, peso) {
        var soma = 0;
        for (var indice = str.length - 1, digito = void 0; indice >= 0; indice--) {
            digito = parseInt(str.substring(indice, indice + 1));
            soma += digito * peso[peso.length - str.length + indice];
        }
        soma = 11 - (soma % 11);
        return soma > 9 ? 0 : soma;
    };
    for (var i = 1; i < 12; i++) {
        if ("".concat(i).repeat(10) === content) {
            return false;
        }
    }
    var digito1 = calc(content.substring(0, 9), pesoCPF);
    var digito2 = calc(content.substring(0, 9) + digito1, pesoCPF);
    return (content ===
        content.substring(0, 9) + digito1.toString() + digito2.toString());
};
export var isCnpj = function (value) {
    if (!value)
        return false;
    var isString = typeof value === 'string';
    var validTypes = isString || Number.isInteger(value) || Array.isArray(value);
    if (!validTypes)
        return false;
    if (isString) {
        if (value.length > 18)
            return false;
        var digitsOnly = /^\d{14}$/.test(value);
        var validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);
        if (!digitsOnly || !validFormat)
            return false;
    }
    var match = value.toString().match(/\d/g);
    var numbers = Array.isArray(match) ? match.map(Number) : [];
    if (numbers.length !== 14)
        return false;
    var items = __spreadArray([], __read(new Set(numbers)), false);
    if (items.length === 1)
        return false;
    var calc = function (x) {
        var slice = numbers.slice(0, x);
        var factor = x - 7;
        var sum = 0;
        for (var i = x; i >= 1; i--) {
            var n = slice[x - i];
            sum += n * factor--;
            if (factor < 2)
                factor = 9;
        }
        var result = 11 - (sum % 11);
        return result > 9 ? 0 : result;
    };
    var digits = numbers.slice(12);
    var digit0 = calc(12);
    if (digit0 !== digits[0])
        return false;
    var digit1 = calc(13);
    return digit1 === digits[1];
};
