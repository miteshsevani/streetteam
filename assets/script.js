$(document).ready(function(){	
    var destination, trainOperator, departureTime, platform, actualDeparture, delayTime, status;

    // Station searched submitted
    document.getElementById('search').addEventListener('click', function() {
        var station = document.getElementById('search-station').value;
        $('#train-information').empty();
        // Update previous searches
        previousSearches(station);

        // get departures of given station
        getDepartures(station);
    })    
});

function getDepartures(station) {    
    // Get departure details of searched station via the api
    $.ajax({
        type: "GET",		        
        url: "https://huxley.apphb.com/departures/"+station+"/15/?accessToken=366953b2-69fa-4c88-a65a-23ff464f071f",        
        dataType: 'json',
        // if successful access
        success: function(data) {            
            $(data.trainServices).each(function(index) {
                destination = this.destination[0].locationName;
                trainOperator = this.operator;
                departureTime = this.std;
                // if platfull return null - return TBC
                platform = (this.platform === null) ? "TBC" : this.platform;
                actualDeparture = this.etd;
                
                // workout delay time
                if(actualDeparture === 'On time') {
                    status = '<span class="on-time">' + actualDeparture + '</span>';
                } else {
                    delayTime = moment.utc(moment(actualDeparture,"HH:mm").diff(moment(departureTime,"HH:mm"))).format("m");
                    status = '<span class="delayed">Delayed<br />' + delayTime + ' mins late</span>';
                }
                
                // build and display html output
                $('#train-information').append('<div class="container"><div class="information"><div class="destination">'+destination+'</div><div class="operator">'+trainOperator+'</div><div class="platform">Platform: '+platform+'</div></div><div class="timing"><div>'+departureTime+'</div><div>'+status+'</div></div></div>');
            })
        },
        // if error occures
        error: function(err) {
            $('#train-information').append('<div class="container">' + err.responseJSON.message + ' Please check your searched station origin.</div>');
        }
    });
}

function previousSearches(station){
    var previousSearches = localStorage.getItem('stations');

    if(previousSearches === null) previousSearches = "";    
    if(!previousSearches.includes(station)) localStorage.setItem('stations', previousSearches + ', ' + station);
    
    document.getElementById('previous-searches').innerHTML = 'Previous destinations: ' + localStorage.getItem('stations');
    document.getElementById('searched-station').innerHTML = 'Trains from: ' + station;
}