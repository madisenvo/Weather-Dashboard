var citySelection = document.querySelector("#city");
var submitBtn = document.querySelector("#submitBtn");
var userInputEl = $('#user-input')
var inputEl = $('.form-input')

var APIKey = "019a7bf4afa5e4a22e320f4131dc54fc";
var city = userFormEl.input.value;



userFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var city = userFormEl.input.value;

    
  
    // var username = nameInputEl.value.trim();
    
  
    // if (username) {
    //   getUserRepos(username);
  
    //   repoContainerEl.textContent = '';
    //   nameInputEl.value = '';
    // } else {
    //   alert('Please enter a GitHub username');
    // }
    console.log(city)
  });


// // getting data from API
//   var getCityWeather = function () {
//     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;  
//     fetch(queryURL)
//       .then(function (response) {
//         if (response.ok) {
//           console.log(response);
//           response.json().then(function (data) {
//             console.log(data);
//           });
//         } else {
//           alert('Error: ' + response.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert('Unable to access weather data.');
//       });
//   };

// getting 5 day forecast
var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&appid=" + APIKey;
fetch(forecastQueryURL)