'use strict';

var validate = {};

validate.length = function (s, n) {
    if (s.length >= n) {
        return true;
    } else {
        return false;
    }
};

validate.phonenumber=function(s){
    if(typeof s == "undefined" || s ===''){
        return true;
    }
    s = s.toString();//ef vid faum tolur inn
    var sjostafaSimanumer = s.replace(/-|\s/g,"");//tokum ut bandstrik og bil
    var re = /^[0-9]/; // þyðir fyrsta talan þarf að vera milli 0 og 9
    if(sjostafaSimanumer.length>=7 && re.test(s) ){
        return true;
    }
    else{
        return false;
    }
};

module.exports = validate;
