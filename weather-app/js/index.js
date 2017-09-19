var lat;
var lon;
var city = document.getElementById("city");
var temperature = document.getElementById("temperature");
var icon = document.getElementById("icon")
var pressure = document.getElementById("pressure");
var humidity = document.getElementById("humidity");
var convert = document.getElementById("convert");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude.toFixed(2);
    lon = position.coords.longitude.toFixed(2);
    
    var newReq = new XMLHttpRequest();
    newReq.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +     "&APPID=a0c208bc09c3e77fd357b555caaa0cae");
    newReq.onload = function() { 
    var newData = JSON.parse(newReq.responseText);
    console.log(newData);
    var celsius = newData.main.temp - 273.15; 
    celsius = celsius.toFixed();
    var fahrenheit = newData.main.temp * 1.8 - 459.67;
    fahrenheit = fahrenheit.toFixed();
    var isFah = false;
    city.innerHTML = "<h2>" + newData.name + " " + newData.sys.country + "</h2>";
    temperature.innerHTML = "<p>" + newData.weather[0].main + " " + celsius + "&deg" + "C" + "</p>";
    icon.innerHTML = "<img src='https://openweathermap.org/img/w/" + newData.weather[0].icon + ".png'>" 
    pressure.innerHTML = "<p>Pressure: " + newData.main.pressure + " HPA" + "</p>";
    humidity.innerHTML = "<p>Humidity: " + newData.main.humidity + " %" + "</p>";
    convert.addEventListener("click", function(){
      if(isFah) {
        temperature.innerHTML = "<p>" + newData.weather[0].main + " " + celsius + "&deg" + "C" + "</p>";
      } else {
        temperature.innerHTML = "<p>" + newData.weather[0].main + " " + fahrenheit + "&deg" + "F" + "</p>";
      }
      isFah = !isFah;
    });
  }
  newReq.send();
  });
}