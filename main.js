var weather;
var $zip = 37217;
var unspecified = 'http://api.wunderground.com/api/7d2491b5dd06b094/geolookup/forecast10day/q/'; 
var $ul = document.querySelector('#daily-forcast');
var url = 'http://api.wunderground.com/api/7d2491b5dd06b094/geolookup/forecast10day/q/' + $zip + '.json';
var $button = document.querySelector('.submit');  
var $city = document.querySelector('.city');

function myAwesomeFunction(data){ 
   weather = data;
   $city.innerHTML = weather.location.city;
   for(var i = 0; i <5; i++) {
     var $img = document.createElement('img')
     $img.src = weather.forecast.simpleforecast.forecastday[i].icon_url;
     var day = weather.forecast.simpleforecast.forecastday[i].date.weekday;
     var highTemp = weather.forecast.simpleforecast.forecastday[i].high.fahrenheit;
     var lowTemp = weather.forecast.simpleforecast.forecastday[i].low.fahrenheit;
     var $li = document.createElement('li');
     $li.innerHTML = day + ":" + " High of " + highTemp + " &amp; " + "Low of " + lowTemp;
     $li.appendChild($img);
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
        if($zip.length != 5){
                alert('Please enter valid zip code');
        } else {
        $ul.innerHTML="";
        var newZip = unspecified + $zip + '.json';
        getJSONP(newZip, 'myAwesomeFunction');
        }
     });               
});


