var cityInput = $("#city");
var submitBtn = $("#submitBtn");
var userFormEl = $('#user-form');
var searchHistoryEl = $("#search-history");
var fiveDayForecastEl = $("#five-day-forecast");
var previousSearch = '';
var currentCity = '';

//syntax for date forecadst
//res.dt_txt.split(" ")[0];

var APIKey = "019a7bf4afa5e4a22e320f4131dc54fc";



// fetch error handler
var handleErrors = function(response){
  if (!response.ok) {
    alert('Error: ' + response.statusText);
  return response;
}};

// getting data from API
function getCityWeather(newCity) {
  //e.preventDefault();
  //var newCity = cityInput.value;
  //console.log(newCity);

  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + APIKey + "&units=imperial";  
  fetch(queryURL) 
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    console.log("Res: " +JSON.stringify(res));
    saveSearch(newCity);
    renderCity();
    // getForecast();



    let cityWeatherHTML = `
      <h3>${res.name} ${res.dt} <img src= https://openweathermap.org/img/w/${res.weather[0].icon}.png> </h3>
      <ul class="list-unstyled p-3 m-3 bg-primary text-light" style="width: 12rem">
        <li>Temperature: ${res.main.temp}°F</li>
        <li>Humidity: ${res.main.humidity}%</li>
        <li>Wind Speed: ${res.wind.speed} mph</li>
      </ul>`;
  $('#city-weather').html(cityWeatherHTML);
  });
};

// save to local storage
var saveSearch = function(newSearch){
  let repeat = false;
// Check if search in local storage
  for (let i = 0; i < localStorage.length; i++) {
      if (localStorage["cities" + i] === newSearch) {
          repeat = true;
          break;
      }
  }
// Save to localStorage if search is new
  if (repeat === false) {
      localStorage.setItem('cities' + localStorage.length, newSearch);
  }
}

// create function to render search history to page
function renderCity(){
  $('#search-history').empty();
  if (localStorage.length===0){
    if (previousSearch){
      $('.city-search').attr("value", previousSearch);
    } else {
      $('.city-search').attr("value", "Denver");
        }
  } else {
    let lastCityKey="cities"+(localStorage.length-1);
    previousSearch=localStorage.getItem(lastCityKey);
    $('.city-search').attr("value", previousSearch);
    for (let i = 0; i < localStorage.length; i++) {
      let city = localStorage.getItem("cities" + i);
      let cityEl;
        if (currentCity===""){
            currentCity=previousSearch;
        }
        if (city === currentCity) {
            cityEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`;
        } else {
            cityEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`;
        } 
        $('#search-history').append(cityEl);
        }
}}

// // getting 5 day forecast
// var getForecast = function(){

// }
// // let cityID = response.data.id;
// var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&appid=" + APIKey;
// fetch(forecastQueryURL)
//   .then(function(response){
//     // for loop to append details to divs - something like...
//     // const forecastEls = document.querySelectorAll(".forecast");
//     // for (i = 0; i < forecastEls.length; i++) {
//     // append something
//   });

  // seach button event listener
submitBtn.on("click", function(event){
  event.preventDefault();
 var temp = $("#city").val();
 console.log(temp);
  getCityWeather(temp);
});

$("#search-history").on("click", function(event){
  event.preventDefault();
  var t = event.target.textContent;
  //$("#city-search").val(event.target.textContent);
  //currentCity=$("#city-search").val();
  getCityWeather(t);
});