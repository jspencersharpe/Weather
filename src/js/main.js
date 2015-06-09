var weather;
var $zip = 10001;
var unspecified = 'http://api.wunderground.com/api/7d2491b5dd06b094/geolookup/forecast10day/q/';
var $ul = document.querySelector('#daily-forcast');
var url = 'http://api.wunderground.com/api/7d2491b5dd06b094/geolookup/forecast10day/q/' + $zip + '.json';
var $button = document.querySelector('.submit');  
var $city = document.querySelector('.city');
var geo = document.querySelector('.geo');
var todayIcon = document.querySelector('.todayIcon');

function myAwesomeFunction(data){ 
  weather = data;
  if (weather.response.error) {
    alert("Please enter a valid zipcode");
  } else {
     $city.innerHTML = weather.location.city + ', ' + weather.location.state;  
      var logo = document.createElement('img');
      logo.src = weather.forecast.simpleforecast.forecastday[0].icon_url;
      
      if ( $(".todayIcon").children().length > 0) {
        todayIcon.replaceChild(logo, logo);
      } else {
        todayIcon.appendChild(logo);        
      }

     for(var i = 0; i <5; i++) {
       var $img = document.createElement('img');
       var base = weather.forecast.simpleforecast.forecastday[i];
       $img.src = base.icon_url;
       var month = base.date.monthname;
       var numDay = base.date.day;
       var day = base.date.weekday;
       var highTemp = base.high.fahrenheit;
       var lowTemp = base.low.fahrenheit;
       var note = weather.forecast.txt_forecast.forecastday[i].fcttext;
       var $li = document.createElement('li');
        $li.className = "days";
        $li.innerHTML = "<span class='first-line'>" + day + "," + " " + month + " " + numDay +  ":" + " High of " + highTemp + " &amp; " + "Low of " + lowTemp + "</span>" + "<br />" + "<span class='note'>" + note + "</span";
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
