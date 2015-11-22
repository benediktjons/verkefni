$(document).ready(function (){

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
    $("select").click(function () {
      var leitFra = $("#leitFra").val();
      var items = [];
      var elementParent = document.getElementsByClassName('parent');


      $('.searchFrom' ).each(function (i, e) {
        items.push($(e).text());
        if(items[i] !== leitFra && leitFra !== 'Veldu'){
            $(elementParent[i]).hide();//latum parentid fela sig
            console.log(elementParent);
          }
          else{
            $(elementParent[i]).show();
          }
        });
    });
// her er til gaurinn og teir verda badir ad vera med select i gangi svo ta  runna teir badir eldsnogt ef breytt er i id runnar bara annar og tad virkar ekki
    $("select").click("click", function () {
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