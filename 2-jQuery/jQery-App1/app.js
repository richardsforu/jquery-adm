$(function() {
   //var s1= $("p").text();
  // console.log(s1);
 // $('#destinations > li').text('Orlando');
   //$('#destinations  li').css({'background-color':'yellow'});

  // $('.promo,#france').css({'background-color':'yellow'});
  //var s2=$('span').first().next().text();
  //console.log(s2);
 // $('span').last().css({'background-color':'yellow'});

  //$("#destinations").children("li").css({'color':'blue'});
  // $('li').first().next().next().prev().next().css({'background-color':'yellow'});
  //$('li').odd().prev().prev().css({'background-color':'yellow'});

  //---------------------------------


  $('button').on('click',function(){
    let price=$("<p class='container'> From $399.99 </p>");
    $('.vacation').append(price);
    $('button').remove();
  })
  


});
