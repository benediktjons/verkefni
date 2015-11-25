$(document).ready(function (){
  'use strict';
  // herna endar leitinn og klick underline fyror siduna sem tu ert a kemur inn
  $("a").click(function () {
    $(this).css("text-decoration", "underline");
  });


  // herna endar underline fallid og date picker fyrir dagatalid kemur inn

  $(".date-picker").datepicker();

  $(".date-picker").on("change", function () {
    var id = $(this).attr("id");
    var val = $("label[for='" + id + "']").text();
    $("#msg").text(val + " changed");
  });

  // herna endar date picker og clockpicker kemur inn fyrir klukkuna

  $('.clockpicker').clockpicker();
  //});
  //byrja h'er ad reyna ad breyta
  //var breytaid;
  //var window.request;

  $('.breyta').on('click', function(){
    var breytaid=$(this).attr('id');
    var myid=breytaid.slice(6);

    var requestElement= document.getElementById('#request'+myid);
    var fromElement = document.getElementById('#from'+myid);
    var toElement = document.getElementById('#to'+myid);
    var timeElement = document.getElementById('#time'+myid);
    var klukkaElement = document.getElementById('#klukka'+myid);
    var fleiraElement = document.getElementById('#fleira'+myid);
    var smokeElement = document.getElementById('#smoke'+myid);
    var seatsElement = document.getElementById('#seats'+myid);


    var request = $(requestElement).text();
    var from = $(fromElement).text();
    var  to = $(toElement).text();
    var  time = $(timeElement).text();
    var  klukka = $(klukkaElement).text();
    var fleira = $(fleiraElement).text();
    var smoke = $(smokeElement).text();
    var seats = $(seatsElement).text();

    console.log(from);
    localStorage.setItem('request', JSON.stringify(request));
    localStorage.setItem('from', JSON.stringify(from));
    localStorage.setItem('to', JSON.stringify(to));
    localStorage.setItem('time', JSON.stringify(time));
    localStorage.setItem('klukka', JSON.stringify(klukka));
    localStorage.setItem('fleira', JSON.stringify(fleira));
    localStorage.setItem('smoke', JSON.stringify(smoke));
    localStorage.setItem('seats', JSON.stringify(seats));
    location.href='/change' ;

  });


});

/* her ad nedan tilraunir til ad faera milli sida

function changestyle(id,  request){
  var val = request;
  console.log('herna')
  console.log(val);
  $('#request option').val(val);
}
//onnur tilraun

$(document).delegate('/change', 'pageinit', function () {

    //get the ID saved as a global variable
    var currentId = window.myId;
    var val = window.request;
    console.log('herna2');
    console.log(val);
    $('#request option').val(val);

    //now do logic for second page
});


//kom TypeError: $.mobile is undefined /egar eg reyndi /etta
/*
  $.mobile.changePage( "/change", {
  type: "post",
  data: {id:window.myid}
});
*/