$(document).ready(function(){	
    var destination, trainOperator, departureTime, platform, actualDeparture, delayTime, status;

    document.getElementById('search').addEventListener('click', function() {
        var station = document.getElementById('search-station').value;
        $('#train-information').empty();
        previousSearches(station);
        getDepartures(station);
    })    
});

function getDepartures(station) {    
    $.ajax({
        type: "GET",		        
        url: "https://huxley.apphb.com/departures/"+station+"/20/?accessToken=366953b2-69fa-4c88-a65a-23ff464f071f",        
        dataType: 'json',
        success: function(data) {            
            $(data.trainServices).each(function(index) {
                destination = this.destination[0].locationName;
                trainOperator = this.operator;
                departureTime = this.std;
                platform = this.platform;
                actualDeparture = this.etd;
                if(actualDeparture === 'On time') {
                    status = actualDeparture;
                } else {
                    delayTime = moment.utc(moment(actualDeparture,"HH:mm").diff(moment(departureTime,"HH:mm"))).format("m");
                    status = '<span class="delayed">Delayed</span><br />' + delayTime + ' mins late';
                    
                }
                
                $('#train-information').append('<tr class="container"><td>'+destination+'</td><td>'+trainOperator+'</td><td>'+departureTime+'</td><td>'+platform+'</td><td>'+status+'</td></tr>');
            })
        }
    });
}

function previousSearches(station){
    var previousSearches = localStorage.getItem('stations');
    
    if(previousSearches === null) previousSearches = "";
    
    if(!previousSearches.includes(station)) {
        localStorage.setItem('stations', previousSearches + ', ' + station);    
    }

    
    document.getElementById('previous-searches').innerHTML = 'Previously searched: ' + localStorage.getItem('stations');
    document.getElementById('searched-station').innerHTML = station;    
}