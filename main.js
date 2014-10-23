var url = 'http://api.wunderground.com/api/7d2491b5dd06b094/forecast10day/q/37217.json';


function getJSONP(url, cbName){
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbName;
  document.body.appendChild($script);
}

function myAwesomeFunction(data){  
     
  for (var i = 0; i <5; i++) {
     var day = data.forecast.simpleforecast.forecastday[i].date.weekday;
     var highTemp = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;
     var lowTemp = data.forecast.simpleforecast.forecastday[i].low.fahrenheit;

function addItemToList(data){
  var $ulInsert = document.querySelector('#daily-forcast')
  var $li = document.createElement('li');
      $li.innerHTML = day + ":" + " High, " + highTemp + " &amp; " + "Low, " + lowTemp;
      $ulInsert.appendChild($li);
}
addItemToList();

}}


document.addEventListener("DOMContentLoaded", function(){
        getJSONP(url, 'myAwesomeFunction');

                
});
