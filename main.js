var url = 'http://api.wunderground.com/api/7d2491b5dd06b094/forecast10day/q/37217.json';


function getJSONP(url, cbName){
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbName;
  document.body.appendChild($script);
}

function myAwesomeFunction(data){
  console.log(data);
  
  var days = object.length;
  for (var i = 0; i < 5; i++) {          

          var $ul = document.getElementById("daily-forcast");
  addItemToList($ul, data.forecast.simpleforecast.forecastday);
}}

function addItemToList($list, itemText){
  var $li = document.createElement($li);
      $li.innerHTML = JSON.stringify(itemText);
      $list.appendChild($li);
}

document.addEventListener("DOMContentLoaded", function(){
        getJSONP(url, 'myAwesomeFunction');

                
});
