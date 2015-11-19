'use strict';

var validate = {};

validate.length = function (s, n) {
    if (s.length >= n) {
        return true;
    } else {
        return false;
    }
};

module.exports = validate;
