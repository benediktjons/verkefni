$(document).ready(function (){
    'use strict';

    //náum í gildi úr localstorage
    var reqvalue = localStorage.getItem('request');
    //parse the value
    var request = JSON.parse(reqvalue);
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
    var seatsvalue = localStorage.getItem('seats');
    var seats= JSON.parse(seatsvalue);
    var smokevalue = localStorage.getItem('smoke');
    var smoke= JSON.parse(smokevalue);
    var idvalue = localStorage.getItem('id');
    var id= JSON.parse(idvalue);

    //breytum völdum gildum í hinum ´´ymsu select og input boxum
    $('#request').val(request);
    $('#changeFra').val(from);
    $('#changeTil').val(to);
    $('#date-picker-2').val(time);
    $('#timiFerdar').val(klukka);
    $('#textarea').val(fleira);
    $('#saeti').val(seats);
    $('#myid').val(id);

    if (smoke === 'Reyklaus'){
        $('#inlineCheckbox1').prop('checked', true);
    }
    else{
        $('#inlineCheckbox1').prop('checked', false);
    }

    $('.btn').on('click', function(){
        localStorage.clear();
    });

});