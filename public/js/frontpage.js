$(document).ready(function (){

    // Herna koma gildinn ur leitinni
    //her eru select gildinn
    $("select, input").click(function () {
      var leitFra = $("#leitFra").val();
      var leitTil = $("#leitTil").val();
      var leitTimabilFra = $("#date-picker-2").val();
      var leitTimabilTil =$("#date-picker-3").val();
// her eru checkbox gildinn tu fa true og false gildi
    var leitReyklaus = $( "#leitReyklaus" ).is(':checked'); // skilar true ef tad er checkd annars false
    var leitOskaEftirFari = $( "#leitOskaEftirFari" ).is(':checked');
    var leitOkumen =$( "#leitOkumen:checkbox:checked" ).is(':checked');



    console.log(leitFra);
    console.log(leitReyklaus);
  });




    $("select").click(function () {
      var leitFra = $("#leitFra").val();
      var items = [];
      var elements = document.getElementsByClassName('jon');
      var elementParent = document.getElementsByClassName('parent');
      console.log(items);
      $('.jon' ).each(function (i, e) {
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

$("select").click(function () {
      var leitFra = $("#leitTil").val();
      var items = [];
      var elements = document.getElementsByClassName('gunnar');
      var elementParent = document.getElementsByClassName('parent');

      $('.gunnar').each(function (i, e) {
        items.push($(e).text());
        if(items[i] !== leitFra && leitFra !== 'Veldu'){
            $(elementParent[i]).hide();//latum parentid fela sig
            console.log(elementParent);
        }
        /*else{
           $(elementParent[i]).show();
        }
        */
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