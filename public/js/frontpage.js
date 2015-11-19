$(document).ready(function (){

    $("a").click(function () {
      $("a").css("color", "blue");
      $("a").css("font-weight","normal");
      $(this).css("color", "red");
      $(this).css("font-weight","bold");
});

    $(".date-picker").datepicker();

    $(".date-picker").on("change", function () {
        var id = $(this).attr("id");
        var val = $("label[for='" + id + "']").text();
        $("#msg").text(val + " changed");
});
});