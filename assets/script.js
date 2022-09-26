var cityInput = $("#city");
var submitBtn = $("#submitBtn");
var userFormEl = $('#user-form');
var searchHistoryEl = $("#search-history");
var fiveDayForecastEl = $("#five-day-forecast");
var previousSearch = '';
var currentCity = '';
var APIKey = "019a7bf4afa5e4a22e320f4131dc54fc";

// getting data from API
function getCityWeather(newCity) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + APIKey + "&units=imperial";  
  fetch(queryURL) 
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    console.log("Res: " +JSON.stringify(res));
// calling functions to save city to local storage & render history to page
    saveSearch(newCity);
    showHistory();
// prints weather data to page
    let cityWeatherHTML = `
      <div class="card col-11 m-5">
        <h2>${res.name} ${moment().format("(MM/DD/YY)")} <img src= https://openweathermap.org/img/w/${res.weather[0].icon}.png> </h2>
        <ul class="list-unstyled m-3">
          <li>Temperature: ${res.main.temp}°F</li>
          <li>Humidity: ${res.main.humidity}%</li>
          <li>Wind Speed: ${res.wind.speed} mph</li>
        </ul>
      </div>`;
  $('#city-weather').html(cityWeatherHTML);

})};

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

// renders search history to page as a button
function showHistory(){
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
      cityEl = `<button type="button" class="w-100 btn-block btn-light btn-lg">${city}</button>`;
        $('#search-history').append(cityEl);
        }
}}

// gets 5 day forecast
function getForecast(newCity){
  let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + "&units=imperial" + "&appid=" + APIKey;
  fetch(forecastQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      console.log("resp :" + JSON.stringify(res))
      let forecastHTML = `
        <h3>5-Day Forecast:</h3>
        <div ml-10></div>`;
        // Loop over the 5 day forecast and prints to page - uses utc offset to get date
        for (let i = 0; i < res.list.length; i++) {
            let day = res.list[i];
            let dayTime = day.dt;
            let timeZone = res.city.timezone;
            let timeZoneHours = timeZone / 60 / 60;
            let thisMoment = moment.unix(dayTime).utc().utcOffset(timeZoneHours);
            let iconURL = "https://openweathermap.org/img/w/" + day.weather[0].icon + ".png";
            // only displays weather conditions for middle of day
            if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
                forecastHTML += `
                <div class="forecast">
                  <ul class="text-sm list-unstyled">
                      <li><h5>${thisMoment.format("MM/DD/YY")}</h5></li>
                      <li><img src="${iconURL}"></li>
                      <li>Temp: ${day.main.temp}&#8457;</li>
                      <li>Humidity: ${day.main.humidity}%</li>
                      <li>Wind Speed: ${day.wind.speed} mph</li>
                  </ul>
                </div>`;
        forecastHTML += `</div>`;
        $('#five-day-forecast').html(forecastHTML);
}}})}

// seach button event listener
submitBtn.on("click", function(event){
  event.preventDefault();
  var temp = $("#city").val();
  getCityWeather(temp);
  getForecast(temp);
});

// makes search history buttons clickable
searchHistoryEl.on("click", function(event){
  event.preventDefault();
  var historyBtn = event.target.textContent;
  getCityWeather(historyBtn);
  getForecast(historyBtn);
});