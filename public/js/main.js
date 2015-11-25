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
});

var val = 'Fish';
$('#changeFra').val(val);

$('.breyta').on('click', function(){
  var breytaid=$(this).attr('id');
  var id=breytaid.slice(6);
  console.log("fallid keyrir");
  var bla= document.getElementById('#request'+id);
  console.log( $(bla).text());
  console.log(id);
  location.href='/change';
  changestyle(id);
});

function changestyle(id){
  //var bla= '#request'+id;
  //console.log( $(bla).text() );
  /*var val = ${;
  $('#changeFra').val(val);*/
}