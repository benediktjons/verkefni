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



// her er fra gaurinn
    $("input, select").change(function () {
      var leitFra = $("#leitFra").val();
      var items = [];
      var elementParent = document.getElementsByClassName('parent');

      $('.searchFrom' ).each(function (i, e) {
        items.push($(e).text());
        if(items[i] !== leitFra && leitFra !== 'Veldu'){
            $(elementParent[i]).hide();//latum parentid fela sig
           // console.log(elementParent);
          }
          else{
            $(elementParent[i]).show();
          }

        });
    });
// her er til gaurinn og teir verda badir ad vera med select i gangi svo
// ta  runna teir badir eldsnogt ef breytt er i id runnar bara annar og tad virkar ekki
    $("select").change(function () {
      var leitTil = $("#leitTil").val();
      var items = [];
      var elementParent = document.getElementsByClassName('parent');

      $('.searchTo').each(function (i, e) {
        items.push($(e).text());
        if(items[i] !== leitTil && leitTil !== 'Veldu'){
            $(elementParent[i]).hide();//latum parentid fela sig
            console.log(elementParent);
          }
      });
    });


        $("input, select").on("change click", function () {
          console.log("virkar")
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
          console.log("daystotaltil");
          console.log(daystotaltil);
          var items = [];
          var elementParent = document.getElementsByClassName('parent');

      $('.searchDate').each(function (i, e) {
        items.push($(e).text());

          var ar= items[i].slice(6,10);
          var manudir= items[i].slice(3,5);
          var dagar= items[i].slice(0,2);
          var dagaralls = ar*365+manudir*30+dagar;
          /*
          debugger;
          */
          console.log(dagaralls)
          if(dagaralls < daystotalfra){
            $(elementParent[i]).hide();//latum parentid fela sig
            //console.log(elementParent[i]);
          }
          /*
          else{
            $(elementParent[i]).show();
          }
*/
           if(daystotaltil!=="0" && dagaralls > daystotaltil){
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
});