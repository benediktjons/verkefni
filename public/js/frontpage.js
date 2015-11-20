$(document).ready(function (){

  $("a").click(function () {

    $(this).css("text-decoration", "underline");


  });

  $(".date-picker").datepicker();

  $(".date-picker").on("change", function () {
    var id = $(this).attr("id");
    var val = $("label[for='" + id + "']").text();
    $("#msg").text(val + " changed");
  });

  $('.clockpicker').clockpicker();

});