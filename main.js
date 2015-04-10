var weather;
var $zip = 37206;
var unspecified = 'http://api.wunderground.com/api/7d2491b5dd06b094/geolookup/forecast10day/q/';
var $ul = document.querySelector('#daily-forcast');
var url = 'http://api.wunderground.com/api/7d2491b5dd06b094/geolookup/forecast10day/q/' + $zip + '.json';
var $button = document.querySelector('.submit');  
var $city = document.querySelector('.city');
var geo = document.querySelector('.geo');

function myAwesomeFunction(data){ 
   weather = data;
  if (weather.response.error) {
    alert("Please enter a valid zipcode");
  } else {
     $city.innerHTML = weather.location.city;  
      for(var i = 0; i <5; i++) {
       var $img = document.createElement('img')
       $img.src = weather.forecast.simpleforecast.forecastday[i].icon_url;
      var month = weather.forecast.simpleforecast.forecastday[i].date.monthname;
      var numDay = weather.forecast.simpleforecast.forecastday[i].date.day;
      var day = weather.forecast.simpleforecast.forecastday[i].date.weekday;
      var highTemp = weather.forecast.simpleforecast.forecastday[i].high.fahrenheit;
      var lowTemp = weather.forecast.simpleforecast.forecastday[i].low.fahrenheit;
      var note = weather.forecast.txt_forecast.forecastday[i].fcttext;
      var $li = document.createElement('li');

             
      $li.innerHTML = day + "," + " " + month + " " + numDay +  ":" + " High of " + highTemp + " &amp; " + "Low of " + lowTemp + "<br>" + note;
      $li.appendChild($img);
      $ul.appendChild($li);
  }
 }
}

function getJSONP(url, cbName){
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbName;
  document.body.appendChild($script);
}

function myLocation(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  console.log(lat, lng);
  place = lat + ',' + lng;
  $ul.innerHTML = '';
  var newUrl = unspecified + place + '.json';
  getJSONP(newUrl, 'myAwesomeFunction');
} 

$(document).ready(function(){
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
    geo.addEventListener('click', function(){
      navigator.geolocation.getCurrentPosition(myLocation);
    })        
});


