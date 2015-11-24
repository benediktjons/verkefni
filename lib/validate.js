/*'use strict';

var validate = {};

validate.length = function (s, n) {
    if (s.length >= n) {
        return true;
    } else {
        return false;
    }
};

validate.phonenumber=function(s){
    if(typeof s === "undefined" || s ===''){
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

validate.isPlace = function(s){
    var array = ["Reykjavík", "Akranes","Akureyri", "Árskógsströnd/Hrísey","Bakkafjörður",

    "Bíldudalur","Búðardalur","Bifröst","Blönduós","Bolungarvík","Borgarfjörður",
    "Borgarnes","Breiðdalsvík","Dalvík","Djúpivogur","Drangsnes","Egilsstaðir",
    "Eskifjörður","Eyrarbakki","Fáskrúðsfjörður", "Flateyri","Flúðir","Garðabær",
    "Garður","Grenivík","Grindavík","Grundarfjörður","Hafnarfjörður","Hólar í Hjaltadal",
    "Hólmavík","Höfn","Húsavík","Heitar laugar á Íslandi","Hella","Hellissandur","Hofsós",
    "Hvammstangi","Hvanneyri","Hveragerði","Hvolsvöllur","Ísafjörður","Kárahnjúkar",
    "Kópasker","Kópavogur","Keflavík","Keflavík (Airport)","Keilissvæðið","Kirkjubæjarklaustur",
    "Landeyjahöfn","Landmannalaugar","Laugar","Laugarvatn","Mývatn","Mjóifjörður","Mosfellsbær",
    "Neskaupstaður","Ólafsfjörður","Ólafsvík","Patreksfjörður","Raufarhöfn","Reyðarfjörður",
    "Reykhólar","Reykholt","Reykjanesbær","Sandgerði","Sauðárkrókur","Súðavík","Selfoss",
    "Seyðisfjörður","Siglufjörður","Skagaströnd","Staður","Stöðvarfjörður","Stokkseyri","Stykkishólmur",
    "Suðureyri","Tálknafjörður","Varmahlíð","Vík","Vestmannaeyjar","Vogar","Vopnafjörður","Þórshöfn",
    "Þingeyri","Þorlákshöfn","Ögur í Ísafjarðardjúpi"];


    if (array.indexOf(s) !== -1){
        return true;
    }
    else{
        return false;
    }
};

validate.request = function(s){
    var array = ["Farþegum", "Fari"];
    if(array.indexOf(s) !== -1){
        return true;
    }
    else{
        return false;
    }
};

validate.numberOfSeats = function(s){
    var array = [1,2,3,4,5,6,7,8,9,10];
    if(array.indexOf(s) !== -1){
        return true;
    }
    else{
        return false;
    }
};
/*
validate.checkDate = function(s){
    var myString = "12/20/2012-12/24/2012";
   var today = new Date();
    var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

parts = s.split("-");
if (Date.parse(parts[0]) < Date.now()) {
    alert("start date has past the present date");

}
=======


}*/
/*
module.exports = validate;
*/
