const cityInput = $(".city-input");
const submitBtn = $("#submitBtn");
const userFormEl = $('#user-form');
const searchHistoryEl = $("#search-history");
const fiveDayForecastEl = $("#five-day-forecast");


var APIKey = "019a7bf4afa5e4a22e320f4131dc54fc";


// none of this is working
var formSubmitHandler = function (event){
  event.preventDefault();
  var city = cityInput.value.trim();

  console.log(city);
}

userFormEl.addEventListener('submit', formSubmitHandler)

// getting data from API
  var getCityWeather = function () {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;  
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to access weather data.');
      });
  };

// getting 5 day forecast
let cityID = response.data.id;
var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
fetch(forecastQueryURL)
  .then(function(response){
    fiveDayForecastEl.classList.remove("d-none");
    // for loop to append details to divs - something like...
    // const forecastEls = document.querySelectorAll(".forecast");
    // for (i = 0; i < forecastEls.length; i++) {
  });