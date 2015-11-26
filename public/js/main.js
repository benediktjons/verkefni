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
  //Hér er fall sem tekur gildin á færslunni sem á að breyta og
  //vistar þau í localstorage. Framhald í change.js
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

    localStorage.setItem('request', JSON.stringify(request));
    localStorage.setItem('from', JSON.stringify(from));
    localStorage.setItem('to', JSON.stringify(to));
    localStorage.setItem('time', JSON.stringify(time));
    localStorage.setItem('klukka', JSON.stringify(klukka));
    localStorage.setItem('fleira', JSON.stringify(fleira));
    localStorage.setItem('smoke', JSON.stringify(smoke));
    localStorage.setItem('seats', JSON.stringify(seats));
    localStorage.setItem('id', JSON.stringify(myid));

    location.href='/change' ;
  });
  /*Þegar viewportið er ákveðið lítið birtast aðrir takkar sem hafa sömu eiginlega og breyta/eyda.
   Föllin nota id til að breyta/eyða og því triggerum við bara click 
   á hina takkana til þess að einfalda okkur lífið.*/
  $('.smallEyda,.smallBreyta').click(function(){
    debugger;
    var id=$(this).attr("id");
    var clickId='#'+id.slice(3);
    $(clickId).trigger("click");
  });

  //setDatepickerDate setur value á #date-picker-2 sem daginn í dag.
  function setDatepickerDate(){
    var dags=new Date();
    dags=dags.toString();
    dags = dags.substr(4,11);//Fáum dags á formið Mán dd yyyy
    var year = dags.substr(7,4);
    var month = dags.substr(0,3);//Tökum út Mán úr dags og notum í switch
    var day=dags.substr(4,2);
    switch (month) {
      case 'Jan':
        month ='01';
        break;
      case 'Feb':
        month = '02';
        break;
      case 'Mar':
        month ='03';
        break;
      case 'Apr':
        month ='04';
        break;
      case 'May':
        month ='05';
        break;
      case 'Jun':
        month ='06';
        break;
      case 'Jul':
        month ='07';
        break;
      case 'Aug':
        month ='08';
        break;
      case 'Sep':
        month ='09';
        break;
      case 'Oct':
        month ='10';
        break;
      case 'Nov':
        month ='11';
        break;
      case 'Dec':
        month ='12';
        break;
      default:
        alert('Whoops! Something went wrong');
        break;
      }
      debugger;
    dags=day+'/'+month+'/'+year;
    $('#date-picker-2').val(dags);
  }
  setDatepickerDate();

});
