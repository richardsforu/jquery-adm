$(function () {


    var flights = [];

    // api server url
     var apiUrl ="http://127.0.0.1:8439/api/pss";

    // render all post
    var allFlightsDiv = $('#search-results');


    $('#search-query').on('submit', function(e){

        e.preventDefault();
        var origin=$('#origin',$(this));
        var destination=$('#destination',$(this));
        var flightDate=$('#flightDate',$(this));
        var travellers=$('#travellers',$(this));

        
        var searchQuery = {
            "origin":origin.val(),
            "destination":destination.val(),
            "flightDate": flightDate.val(),
            "travellers":travellers.val()
        }

        console.log(searchQuery);

        
        $.ajax(apiUrl,{
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify(searchQuery),
            success:function(results){
                console.log(results);
                flights=results;
                renderAllFlights();
            }

        })
    });


    // render results Template

     function renderAllFlights() {
        //allFlightsDiv.children().remove();
        flights.forEach(function (flight) {

            console.log(flight);

            var postTemplate = `
            <div class="list-group-item">
                <div class="alert alert-info">
                    <span><img src="images/${flight.flightInfo.airlineInfo.airlineLogo}" height="20" width="30"> </span>
                    <span><b>${flight.flightInfo.airlineInfo.airlineName}</b></span>
                    <span> <b>${flight.flightTime}</b></span>
                    <span class="badge bg-primary">${flight.origin} </span>  To
                    <span class="badge bg-primary">${flight.destination}</span> </span> 
                     <span class=''>
                        <button class="btn btn-sm btn-primary">Book</button>
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