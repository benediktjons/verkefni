$(document).ready(function (){
    'use strict';

    // Herna koma gildinn ur leitinni
    //her eru select gildinn
    $("select, input").click(function () {
      //ÞETTA FALL ER OÞARFI VAR BARA PRUFA HÆGT AÐ SJA HVERNIG NALGAST SKAL GILDINN
      // EKKI DELATEA

    var leitFra = $("#leitFra").val();
    var leitTil = $("#leitTil").val();
    var leitTimabilFra = $("#date-picker-2").val();
    var leitTimabilTil =$("#date-picker-3").val();

// her eru checkbox gildinn tu fa true og false gildi
    var leitReyklaus = $( "#leitReyklaus" ).is(':checked'); // skilar true ef tad er checkd annars false
    var leitOskaEftirFari = $( "#leitOskaEftirFari" ).is(':checked');
    var leitOkumen =$( "#leitOkumen:checkbox:checked" ).is(':checked');
  });

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
            console.log(elementParent);
          }
      });
    });


//Fall sem synir bara valdar dagsetningar
        $("input, select").on("change click", function () {
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
      //reykstatus otharfi
      var reykstatus = $("#Reyklaus").val();
      var items = [];
      var elementParent = document.getElementsByClassName('parent');

      $('.searchSmoke' ).each(function (i, e) {
        items.push($(e).text());
        if( document.getElementById('leitReyklaus').checked){
          if(items[i] !== "Reyklaus"){
              $(elementParent[i]).hide();//latum parentid fela sig
             // console.log(elementParent);
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
          var items = [];
          var elementParent = document.getElementsByClassName('parent');

      $('.searchSeats').each(function (i, e) {
        items.push($(e).text());

          var totalseats= items[i].slice(5,6);
          console.log(totalseats);

          if(totalseats < saetafjoldi){
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

//gera n'ytt stort fall h'er




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

// herna er fallid fyrir orvarnar sem breytast upp og nidur
$('.parent').click(function blabla() {
  debugger;
  var id = $(this).attr('aria-expanded');
  var id2 = $(this).attr("id");
  var id3 = "#"+id2;
  var id4 = "#a" + id2;


if(id ==="false")
{
    $(id4).html('<span class="glyphicon glyphicon-chevron-up"></span>');
}
else
{
    $(id4).html('<span class="glyphicon glyphicon-chevron-down"></span>');
}
});

});