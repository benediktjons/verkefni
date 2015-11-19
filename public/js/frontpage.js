$(document).ready(function (){

    $("a").click(function () {
      $("a").css("color", "blue");
      $("a").css("font-weight","normal");
      $(this).css("color", "red");
      $(this).css("font-weight","bold");
});
});