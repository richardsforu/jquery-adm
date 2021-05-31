$(function () {
    var flights = [];
    var flight = {}
    var searchQuery ={};
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
                    flight = response
                    renderBookingForm();
                }
            })


            //  get data dor a flight selected for booking


        })

    });


    // render results Template

    function renderBookingForm() {

        console.log(searchQuery.travellers);


        var bookingTemplte = `
        <hr/>
        <div>
            <div> 
                <label>First Name: </label>
                <input type="text" id="firstName"> 
            </div>

            <div> 
                 <label>Last Name: </label>
                 <input type="text" id="lastName"> 
             </div>

             <div>
               <label>Gender: </label>
                <input type="text" id="gemder"> 
            </div>

            <div> 
                 <label>Email Address: </label>
                 <input type="text" id="emailAddress"> 
             </div>

             <div> 
                 <label>Mobile Number: </label>
                 <input type="text" id="mobileNumber"> 
             </div>
             <hr/>

             <h6>Co-Passenger Information
        </div>
        
        `

        for(var i=1;i<=searchQuery.travellers-1;i++){
           // console.log("-------- "+i);
           var coPassengersTemplate=coPassengersTemplate=`
            <div>
                <input type="text" id="co-passenger-firstName${i}"/>
            </div>
           `
           bookingFormDiv.append(coPassengersTemplate);
           
        }
        $('#search-results').remove();
        bookingFormDiv.append(bookingTemplte);
       // $('#booking-form').append(coPassengersTemplate);

      
    }

    function renderAllFlights() {
        //allFlightsDiv.children().remove();
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
            allFlightsDiv.append(postTemplate);
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