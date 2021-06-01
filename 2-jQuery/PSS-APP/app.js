$(function () {
    var flights = [];
    var flight = {}
    var searchQuery = {};
    var query = {}
    // api server url
    var searchApiUrl = "http://localhost:8080/api/pss/search";
    var bookingApiUrl = "http://localhost:8080/api/pss/booking"

    // render all post
    var allFlightsDiv = $('#search-results');
    var bookingFormDiv = $('#booking-form');


    $('#search-query').on('submit', function (e) {

        e.preventDefault();

        var origin = $('#origin', $(this));
        var destination = $('#destination', $(this));
        var flightDate = $('#flightDate', $(this));
        var travellers = $('#travellers', $(this));

        searchQuery = {
            "origin": origin.val(),
            "destination": destination.val(),
            "flightDate": flightDate.val(),
            "travellers": travellers.val()
        }
        query = searchQuery;

        console.log(searchQuery);


        $.ajax(searchApiUrl, {
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(searchQuery),
            success: function (results) {
                console.log(results);
                flights = results;
                renderAllFlights();
            }

        })



        $('#search-results').on('click', '#book-flight', function () {

            var id = $(this).closest('div').data('id');
            console.log(id);

            $.ajax(searchApiUrl + '/' + id, {
                method: 'GET',
                success: function (response) {

                    console.log(response);
                    flight = response;
                    renderBookingForm();
                }
            })
        })

    });

    $('#booking-form').on('submit', function (e) {

        e.preventDefault();

        var data = $(this).serializeFields();


      //  var obj = $("#booking-form").serializeToJSON();
            
            console.log(data);
       
       /* var data = $('#booking-form').serializeArray();
        console.log(data);

        for (var i = 0; i < data.length; ++i) {
            console.log(data[i].firstName);
        }
        */

        /*
        var cp=[];
        var loginFormObject = {};
        $.each(data,
            function (i, v) {
                loginFormObject[v.name] = v.value;
                cp.push(loginFormObject);
                console.log(loginFormObject);

            });
         console.log(cp);
         */

         console.log(">>>>>>>");
         console.log(flight);

         var copassengers=query.travellers-1;

         var coPassengers=[];
         var coPassenger={};
         for(var i=0;i<copassengers;i++){
            copPassenger={
                "firstName":$(`#co-firstName${i}`, $(this)).val(),
                "lastName":$(`#co-lastName${i}`, $(this)).val(),
                "gender":$(`input[name='co-gender${i}']:checked`).val(),
            }
            coPassengers.push(copPassenger);

         }
         console.log(">>>>> ###  <<<<<<<");
         console.log(coPassengers);
        jsonObj = {
            "origin": query.origin,
            "destination": query.destination,
            "flightDate": query.flightDate,
            "travellers": query.travellers,
            "flightNumber": flight.flightNumber,
            "passenger":{
                "firstName": $('#firstName', $(this)).val(),
                "lastName": $('#lastName', $(this)).val(),
                "emailAddress": $('#emailAddress', $(this)).val(),
                "mobileNumber": $('#mobileNumber', $(this)).val(),
                "gender": $("input[name='pgen']:checked").val(),
                "coPassengers":coPassengers
            }

        }

        $.ajax(bookingApiUrl,{
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify(jsonObj),
            success:function(response){
                console.log(response);
            }
        })
        //console.log(">>>>>>");
       // console.log(jsonObj);

    });


    // render results Template
    function renderBookingForm() {
        console.log(searchQuery.travellers);
        var bookingTemplte = `

        <br/>
        <h3>Primary passenger Information</h3>
        <hr/>
       
             <div> 
                <label>First Name: </label>
                <input type="text" id="firstName"> 
             </div>

             <div> 
                 <label>Last Name: </label>
                 <input type="text" id="lastName"> 
             </div>

             <div>
                 <label>Gender</label>
                 <input type ="radio" name="pgen" class="pgen" value="Male"/> Male
                 <input type ="radio" name="pgen" class="pgen" value="Female"/> Female
             </div

            <div> 
                 <label>Email Address: </label>
                 <input type="text" id="emailAddress"> 
             </div>

             <div> 
                 <label>Mobile Number: </label>
                 <input type="text" id="mobileNumber"> 
             </div>
             <br/>

             <h3>Co-Passenger Information</h3>
             <hr/>

        </div>
        
        `
        $('#booking-form').append(bookingTemplte);

        for (var i = 0; i < searchQuery.travellers - 1; i++) {
            var copsg = `
               <div>
                    <h5>Passenger ${i + 1} Information</h5>
                 
                    <div>
                         <label>First Name</label>
                         <input type ="text" name="firstName" id="co-firstName${i}"/>
                    </div>

                    <div>
                         <label>Last Name</label>
                         <input type ="text" name="lastName" id="co-lastName${i}"/>
                    </div>

                    <div>
                        <label>Gender</label>
                        <input type ="radio" name="co-gender${i}" value="Male"/> Male
                        <input type ="radio" name="co-gender${i}" value="Female"/> Female
                    </div
                   

               </div>
               <br/>
           `
            $('#booking-form').append(copsg)
        }
        $('#booking-form').append('<button>Book</button>');
        $('#search-results').hide();
    }

    function renderAllFlights() {
        allFlightsDiv.children().remove();
        flights.forEach(function (flight) {
            console.log(flight);
            var postTemplate = `
            <div class="list-group-item">
                <div class="alert alert-info" id="d1" data-id="${flight.id}">
                    <span><img src="images/${flight.flightInfo.airlineInfo.airlineLogo}" height="20" width="30"> </span>
                    <span><b>${flight.flightInfo.airlineInfo.airlineName}</b></span>
                    <span> <b>${flight.flightTime}</b></span>
                    <span class="badge bg-primary">${flight.origin} </span>  To
                    <span class="badge bg-primary">${flight.destination}</span> </span> 
                     <span class="float-end">
                        <button class="btn btn-sm btn-primary" id="book-flight">Book</button>
                        <button class="btn btn-sm btn-danger">Cancel</button>

                     </span>
                </div>

            </div>
            `
            // alert('testt')
            $('#search-results').append(postTemplate);
            //$('#booking-form').remove();

        })

    }




    /*
    $.ajax('http://localhost:8439/api/pss/Delhi/Chennai/2021-05-26/2', {
        method: 'GET',
        success: function (flights) {
            console.log(flights);
        },
        error: function (e) {
            console.log(e);
        }
    })
    */


})