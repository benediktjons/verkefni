$(document).ready(function (){
    debugger;
    'use strict'
    console.log('/etta keyrir')
    //console.log(id);
    var reqvalue = localStorage.getItem('request');
    //pase the value
    var request = JSON.parse(reqvalue);
    console.log(request);
    console.log(jQuery.type(request));

    var fromvalue = localStorage.getItem('from');
    var from = JSON.parse(fromvalue);
    var tovalue = localStorage.getItem('to');
    var to= JSON.parse(tovalue);
    var timevalue = localStorage.getItem('time');
    var time= JSON.parse(timevalue);
    var klukkavalue = localStorage.getItem('klukka');
    var klukka= JSON.parse(klukkavalue);
    var fleiravalue = localStorage.getItem('fleira');
    var fleira= JSON.parse(fleiravalue);

    if (request == "Fari"){
        console.log('WTF?');
        //console.log(klukka + time + from + fleira );
    }
    console.log(from);
    $('#changeFra').val(from);
    $('#changeTil').val(to);
    $('#date-picker-2').val(time);
    $('#timiFerdar').val(klukka);
    $('#textarea').val(fleira);










});