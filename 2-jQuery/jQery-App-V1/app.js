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
  //$('button').on('click',function(){
  $('.price').on('click',function(){

    //let price=$("<p>From  &#8377; 6000 </p>");
    var vacation=$(this).closest('.vacation');
    var amount=vacation.data('price');

    var price=$(`
    <p>
        &#8377; ${amount} per ticket
        <p>
            Tickets:
            <input type="number" class="quantity" value="1">
            <hr/>
            <p>Total Price: <span id='total'> ${amount} </span> </p>

        </p>
        <hr/>
        <button>Confirm and Book</button>

    </p>
    `);

   // $('.vacation').append(price);
   //price.appendTo($('.vacation'));
   vacation.append(price);
   //$('.vacation').append(price);
    $(this).remove();
  })


  // Updaring Price

  $('.vacation').on('keyup change','.quantity',function(e){

    var price=$(this).closest('.vacation').data('price');

    let quantity=$(this).val();
   //$('#total').text(price * quantity);
   
   $(this).parent().parent().find('#total').text(price*quantity);
  

  })


  // filtering packages
  $('#filters').on('click','.btn-success',function(){
  $('.bg-warning').removeClass('bg-warning');
   $('.vacation').filter('.onsale').addClass('bg-info');
  })
  
  $('#filters').on('click','.btn-danger',function(){
    $('.bg-info').removeClass('bg-info');
    $('.vacation').filter('.expiring').addClass('bg-warning');
   })
   


});
