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
      console.log('her er elements ' + elements);

      $('.jon').each(function (i, e) {
        items.push($(e).text());
        if($(e).text() !== leitFra){
          console.log(e);
          //$(elements[i]).hide();// þetta virkar en allir gaurarnir slidea
            $(elementParent[i]).hide();//latum parentid fela sig
            console.log(elementParent);

        }
      });
console.log(items);//þetta virkar
console.log('þetta virkar');
/*
for ( i in items){
  if(items[i] !== leitFra){
    console.log("ég er ekki " + leitFra);
    console.log(i);
    $('.jon').hide();
  }
}*/
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