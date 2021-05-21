/*
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( ">>>> ready! " );
    $("h1").text("My Own Text")
});
*/

// Shorthand for $( document ).ready()
$(function() {
  //  console.log( "<<<<>>> ready!" );

   // $('div').text("Hello jQuery");
   // $("h1").text("h1 is modified");
   //$("#d1").text("Div 1 Data")
   //$(".c1").text("Div3 Data");

  // $("#d2").append("Modified");

  $('#d1').css({'color':"blue"})
  $('#d2').css({'color':"red"})
  $('#d1').css({"background-color":"yellow","text-align":"center"})
  $("#head").css({"text-align":"center"})


  // Events

  /*
  $('button').click(function(){
      console.log(">>>> clicked....");
      $("#c1").css({'background-color':'yellow'});
  })
  */

  $("#b1").on('click', function(){
    $("#c1").css({"background-color":'yellow'});
  })

  $("#b2").on('click', function(){
    $("#c2").css({'background-color':'yellow'});
  })

  $("#i1").on('keyup', function(e){
    $("#c2").text(e.target.value);
  })











   



});
