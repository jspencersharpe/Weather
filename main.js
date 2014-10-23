var $zip = 37217;
var unspecified = 'http://api.wunderground.com/api/7d2491b5dd06b094/geolookup/forecast10day/q/'; 
var $ul = document.querySelector('#daily-forcast');
var url = 'http://api.wunderground.com/api/7d2491b5dd06b094/geolookup/forecast10day/q/' + $zip + '.json';
var $button = document.querySelector('.submit');  

function myAwesomeFunction(data){ 
   for(var i = 0; i <5; i++) {

     var day = data.forecast.simpleforecast.forecastday[i].date.weekday;
     var highTemp = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;
     var lowTemp = data.forecast.simpleforecast.forecastday[i].low.fahrenheit;
     var $li = document.createElement('li');
     $li.innerHTML = day + ":" + " High, " + highTemp + " &amp; " + "Low, " + lowTemp;
     $ul.appendChild($li);
  }
}

function getJSONP(url, cbName){
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbName;
  document.body.appendChild($script);
}

document.addEventListener('DOMContentLoaded', function(){
        getJSONP(url, 'myAwesomeFunction');
        $button.addEventListener('click', function() {
        $zip = document.querySelector('.zip').value;
        $ul.innerHTML="";
        var newZip = unspecified + $zip + '.json';
        getJSONP(newZip, 'myAwesomeFunction');
        
     });               
});


