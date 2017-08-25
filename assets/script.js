$(document).ready(function(){	
    var destination, trainOperator, departureTime, platform, actualDeparture, delayTime, status;

    document.getElementById('search').addEventListener('click', function() {
        var station = document.getElementById('search-station').value;
        
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
                    status = '<span class="on-time">' + actualDeparture + '</span>';
                } else {
                    delayTime = moment.utc(moment(actualDeparture,"HH:mm").diff(moment(departureTime,"HH:mm"))).format("m");
                    status = '<span class="delayed">Delayed<br />' + delayTime + ' mins late</span>';
                }
                $('#train-information').append('<div class="container"><div class="information"><div class="destination">'+destination+'</div><div class="operator">'+trainOperator+'</div><div class="platform">Platform: '+platform+'</div></div><div class="timing"><div>'+departureTime+'</div><div>'+status+'</div></div></div>');
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

    document.getElementById('previous-searches').innerHTML = 'Previous destinations: ' + localStorage.getItem('stations');
    document.getElementById('searched-station').innerHTML = 'Trains from: ' + station;
}