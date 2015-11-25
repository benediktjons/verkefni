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
    var array = ["1","2","3","4","5","6","7","8","9","10"];
    if(array.indexOf(s) !== -1){
        return true;
    }
    else{
        return false;
    }
};

validate.checkDate = function(s){
    var myString = "12/20/2012-12/24/2012";
    var today = new Date();
    var format = today.toString('yyyy-MM-dd');
    var yyyy = format.slice(11,15);
    var mm = format.slice(4,7);
    var dd = format.slice(8,10);

// nu turfum vid ad breyta nov,des,jan... i 11,12,01

switch (mm) {
        case 'Jan':
          mm ='01';
          break;
        case 'Feb':
          mm = '02';
          break;
        case 'Mar':
          mm ='03';
          break;
        case 'Apr':
          mm ='04';
          break;
        case 'May':
          mm ='05';
          break;
        case 'Jun':
          mm ='06';
          break;
        case 'Jul':
          mm ='07';
          break;
        case 'Aug':
          mm ='08';
          break;
        case 'Sep':
          mm ='09';
          break;
        case 'Oct':
          mm ='10';
          break;
        case 'Nov':
          mm ='11';
          break;
        case 'Dec':
          mm ='12';
          break;
        default:
          console.log('Whoops! Something went wrong');
          break;
      }

    // tokum næst  okkkar streng i sundur
    var  dagur = s.slice(0,2);
    var manudur = s.slice(3,5);
    var ar = s.slice(6,10);
    if(ar> yyyy){
        return true;
    }
    else if(ar>=yyyy && manudur>mm ){
        return true;
    }
    else if(dagur>= dd &&  manudur >= mm && ar>=yyyy){
        return true;
    }
    else{
        return false;
    }

    }

validate.checkClock = function(s){

      var re= /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return re.test(s);

    }

module.exports = validate;

