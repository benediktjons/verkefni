$(document).ready(function (){
  'use strict';
  console.log("frontpage keyrir");
  // her er til og fra gaurinn
  $("input, select").on("change click", function () {
    var leitFra = $("#leitFra").val();
    var itemsFra = [];
    var leitTil = $("#leitTil").val();
    var itemsTil = [];
    var elementParent= document.getElementsByClassName('parent');

    $('.searchFrom' ).each(function (i, e) {
      itemsFra.push($(e).text());
      if(itemsFra[i] !== leitFra && leitFra !== 'Veldu'){
        $(elementParent[i]).hide();//latum parentid fela sig
      }
      else{
        $(elementParent[i]).show();
      }
    });

    $('.searchTo').each(function (i, e) {
      itemsTil.push($(e).text());

      if(itemsTil[i] !== leitTil && leitTil !== 'Veldu'){
        $(elementParent[i]).hide();//latum parentid fela sig
      }
    });
  });


  //Fall sem synir bara valdar dagsetningar
  $("input, select").on("change click", function () {
    debugger;
    var dagssetningfra = $("#date-picker-2").val();
    var yearsfra= dagssetningfra.slice(6,10);
    var monthsfra= dagssetningfra.slice(3,5);
    var daysfra= dagssetningfra.slice(0,2);
    var daystotalfra = yearsfra*365+monthsfra*30+daysfra;
    var dagssetningtil = $("#date-picker-3").val();
    var yearstil= dagssetningtil.slice(6,10);
    var monthstil= dagssetningtil.slice(3,5);
    var daystil= dagssetningtil.slice(0,2);
    var daystotaltil = yearstil*365+monthstil*30+daystil;
    var items = [];
    var elementParent = document.getElementsByClassName('parent');

    $('.searchDate').each(function (i, e) {
      debugger;
      items.push($(e).text());

      var ar= items[i].slice(6,10);
      var manudir= items[i].slice(3,5);
      var dagar= items[i].slice(0,2);
      var dagaralls = ar*365+manudir*30+dagar;

      if(dagaralls < daystotalfra){
        $(elementParent[i]).hide();//latum parentid fela sig
      }
      if(daystotaltil!=="0" && dagaralls > daystotaltil){
        $(elementParent[i]).hide();//latum parentid fela sig
      }
    });
  });

  //fall sem synir bara reyklaus
  $("input, select").on("change click", function () {
    var items = [];
    var elementParent = document.getElementsByClassName('parent');

    $('.searchSmoke' ).each(function (i, e) {
      items.push($(e).text());
      if(document.getElementById('leitReyklaus').checked){
        if(items[i] !== "Reyklaus"){
          $(elementParent[i]).hide();//latum parentid fela sig
        }
      }
    });
  });

  //fall sem felur tha sem oska ekki eftir fari og tha sem oska ekki eftir farthegum
  $("input, select").on("change click", function () {
    var items = [];
    var elementParent = document.getElementsByClassName('parent');

    $('.searchRequest' ).each(function (i, e) {
      items.push($(e).text());
      if( document.getElementById('leitOskaEftirFari').checked){
        if(items[i] !== "Fari"){
          $(elementParent[i]).hide();//latum parentid fela sig
          // console.log(elementParent);
        }
      }
      if( document.getElementById('leitOkumenn').checked){
        if(items[i] !== "Farþegum"){
          $(elementParent[i]).hide();//latum parentid fela sig
        }
      }
      });
  });

  //Fall sem synir bara fleiri eda jafnt voldum saetafjolda
  $("input, select").on("change click", function () {
    var saetafjoldi = $("#saetaleit").val();
    var saetafjoldi2 = $("#saetaleit2").val();
    var saetialls = 1;
    if(saetafjoldi>saetafjoldi2){
      saetialls=saetafjoldi;
    }
    else if(saetafjoldi<saetafjoldi2){
      saetialls=saetafjoldi2;
    }
    else{
      saetialls=saetafjoldi;
    }
    var items = [];
    var elementParent = document.getElementsByClassName('parent');
    $('.searchSeats').each(function (i, e) {
      items.push($(e).text());
        var totalseats= items[i].slice(5,6);
        if(totalseats < saetialls){
          $(elementParent[i]).hide();//latum parentid fela sig
        }

    });
  });

  /*Fallið correctIfFromISGreaterThanTo breytir gildinu á til dagsetningunni
  í gildið á frá dagsetningunni ef að frá er 'stærra' en til gildið.
  Þ.a. ekki er hægt að velja t.d. frá okt. 2015 til okt 2013.*/
  $('.date-picker').change(function correctIfFromIsGreaterThanTo(){

    var fromDate = $('#date-picker-2').val();
    var toDate = $('#date-picker-3').val();
    //Athugum ef að annað hvort toDate eða fromDate er tómt og hættum við að keyra fallið ef svo er
    if (!toDate || !fromDate){
      return;
    }
    else{
      var fromYears=fromDate.slice(6,10);
      var fromMonths=fromDate.slice(3,5);
      var fromDays=fromDate.slice(0,2);
      var toYears=toDate.slice(6,10);
      var toMonths=toDate.slice(3,5);
      var toDays=toDate.slice(0,2);

      var fromTotal=fromYears*365+fromMonths*30+fromDays;
      var toTotal=toYears*365 +toMonths*30+toDays;

      //Athugum hér ef frá dagsetningin er 'stærri' en til dagsetningin og breytum til þ.a. til=frá ef svo er.
      if (fromTotal>toTotal){
        $('#date-picker-3').val(fromDate);
      }
    }
  });

    function felatakka(){
      var username = $(".user").text();
      var items = [];
      var elementBaraUser = document.getElementsByClassName('BaraUser');
      var syna = document.getElementsByClassName('syna');

      if (username )  {
        $('.searchNotandi').each(function (i, e) {
          items.push($(e).text());
          var notandi = items[i].slice(9);
            if(notandi !== username){
              $(elementBaraUser[i]).hide();//latum parentid fela sig
              $(syna[i]).removeClass('hidden xs hidden sm hidden-md hidden-lg');

            }
        });
      }
      else {
        $('.BaraUser').hide();
        $(syna).removeClass('hidden xs hidden sm hidden-md hidden-lg');

      }
  }

  felatakka();


  //dateFormat tekur date á því formati sem það kemur úr gagnagrunninum,
  // t.d. (Wed Nov 25 2015 00:00:00 GMT+0000 (Greenwich Standard Time)) og strípar það í dd/mm/yyyy
  function dateFormat(){
    $('.searchDate').each(function(){
      var dags = $(this).text();//Skilar dags á formattinu Dag Mán dd yyyy tími timezone ofl sem við viljum ekki
      dags = dags.slice(4,16);//Fáum dags á formið Mán dd yyyy
      var year = dags.slice(7,11);
      var month = dags.slice(0,3);//Tökum út Mán úr dags og notum í switch
      var day=dags.slice(4,6);

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
      dags=day+'/'+month+'/'+year;
      $(this).text(dags);
    });
  }

  dateFormat();


$('.smooth-click').click(function(){
  var klasi = $(this).attr('id');
  $.ajax({
    url: '/',
    type: 'get',
    dataType: 'json',
    data: {name:klasi},
    contentType: 'application/json',
    success: function(data){
       alert("success");
       alert(data);
    }
  });
});
$('#eyda').click(function(e){
  e.preventDefault();
});



// herna er fallid fyrir orvarnar sem breytast upp og nidur
$('.parent').click(function blabla() {
  var id = $(this).attr('aria-expanded');
  var id2 = $(this).attr("id");
  var id3 = ".a" + id2;

  if(id ==="false")
  {
      $(id3).removeClass('glyphicon-chevron-down');
      $(id3).addClass('glyphicon-chevron-up');
  }
  else
  {
      $(id3).removeClass('glyphicon-chevron-up');
      $(id3).addClass('glyphicon-chevron-down');
  }
  });

  //Keyrum þetta þegar ýtt er á delete takkann.
  //Eyðir færslunni úr gagnagrunnig og úr DOM tré
  $('.eyda').on('click', function(){
    var eydaid=$(this).attr('id');
    var id=eydaid.slice(4);
    var arcticle1=$('#entry'+id);
    var arcticle2=$('#'+id);
    var del = confirm('Ertu viss um að þú viljir eyða færslunni?');
    if (del === true){
      $.ajax({
        url: '/',
        type: 'get',
        dataType: 'json',
        data: {id: id},
        contentType: 'application/json',
        success: function(data){
           alert("success");
           alert(data);
        }
      });
    arcticle1.remove();
    arcticle2.remove();
    }
  });




  //Gerir transation-ið smooth þegar smellt er á örvatakkann
  $('.smooth-click').click(function(){
    $('html, body').animate({
      scrollTop: $($.attr(this,'href')).offset().top
    }, 500);
    return false;
  });

  $('.search').click(function(){
    $('html, body').animate({
      scrollTop: $($.attr(this,'href')).offset().top
    }, 500);
    return false;
  });

  //Komum í veg fyrir að #id bætist við eftir að klikka á takka sem færir mann á ákveðið element
  $(window).on('hashchange', function(e){
      history.replaceState ("", document.title, e.originalEvent.oldURL);
  });

  //Finnum y-gildi main elementsins og látum navbarinn fade-a inn þegar y er komið þangað
  window.addEventListener("scroll", function() {
    var height= document.getElementById('navbar').offsetHeight;

    if (window.scrollY>height) {
        $('.navbar').fadeIn();
    }
    else {
        $('.navbar').fadeOut();
    }
  },false);

  //Setur rétt icon í 'óska eftir' dálkinn í minnstu skjástærð
  function setIcon(){
    var stor = $('.searchRequest');
    var litill = $('.rideIcon');
    var image =$('.rideImage');
    var fjoldiSaeta = $('.fjoldiSaeta');
    $('.herna').each(function(i){
      var texti=stor[i].innerHTML;
      var icon = litill[i];
      var mynd = image[i];
      if (texti === 'Fari'){
        var fj = fjoldiSaeta[i].innerHTML;
        if (fj==="1"){
          $(mynd).hide();
          $(icon).addClass('glyphicon-user');
        }
        else{
          $(icon).hide();
          var src = '/images/glyphicon_multi.png';
          $(mynd).attr("src", src);
        }
      }
      else if (texti === 'Farþegum'){
        $(icon).hide();
        var src2 = '/images/glyphicon_car.png';
        $(mynd).attr("src", src2);
      }
    });
  }
  setIcon();

});
