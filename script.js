// unique API key
var apiKey = "3a081812dd82486ab2485127d4ec4566";
var displayArea = document.getElementById ("main")
var main = $("main");
var form = $("#form");
var search = $("#search");
var city = "";

// `https://api.weatherbit.io/v2.0/alerts?city={City,StateAbreviation}&key=0aec531cfccd4364841446fc91ca9602`

// use API to get weather alerts by location, fetch request
function getAlertsByLocation() {
  fetch(
    `https://api.weatherbit.io/v2.0/alerts?city=${city}&key=3a081812dd82486ab2485127d4ec4566`
  )
    .then((resp) => resp.json())
    .then((respData) => {
      console.log(respData);
      addAlertsToPage(respData);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
}

// add alerts to page, Rico will ask tutor about adding if/else statements for # of alerts
function addAlertsToPage(data) {
  var cityAlerts = document.createElement("div");
  cityAlerts.classList.add("weather");

  
 
  // No alerts
  if (data.alerts.length === 0) {
    displayArea.innerText = "No weather alerts for this city!";
  
  }
 
  // 1 or more alerts
  else {
    let displayMessage = "";
    data.alerts.forEach((alert) => {
      displayMessage += alert.title + "\n"; // assuming each alert is a string adjust as necessary
    });
    displayArea.innerText = displayMessage;
  }
  main.innerHTML = "";
  main.append(cityAlerts);
};

function getSearchedCity () {
  city = search.val();
  console.log(city);
  if (city) {
    getAlertsByLocation();
  }
}

// need to configure searchBtn and clearBtn
document
  .getElementById("searchBtn")
  .addEventListener("click", getSearchedCity);

// click enter, results show
form.on("submit", (event) => {
  console.log("SUBMIT");
  event.preventDefault();
getSearchedCity()
  
});


// get the search history from local storage if available
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// add a search term to the history
function addToSearchHistory() {
  var searchTerm = search.val().trim();

  if (searchTerm !== '') {
    // add the search term to the history
    searchHistory.push(searchTerm);

    // update the local storage with the updated search history
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    // clear the search input field
    search.val('');

    // refresh the displayed search history
    displaySearchHistory();
  }
}

// display the search history on the page
function displaySearchHistory() {
  var searchHistoryList = $('#searchHistoryList');

  // clear the existing list
  searchHistoryList.empty();

  // create starting index to display the search history, only show 5 items
  let startIndex = Math.max(0, searchHistory.length - 5);

  // iterate through the search history and create list items (up to 5 items)
  for (let i = startIndex; i < searchHistory.length; i++) {
    var searchTerm = searchHistory[i];
    var listItem = $('<li class="text-base hover:text-blue-500"></li>').text(searchTerm);
    searchHistoryList.append(listItem);
  };
}


// click event listener to search history list items
function handleHistoryItemClick() {
  $('#searchHistoryList').on('click', 'li', function() {
    var clickedSearchTerm = $(this).text();
    // Call getCurrentWeather() with the clicked search term
    getResultsWithSearchTerm(clickedSearchTerm);
  });
}

function getResultsWithSearchTerm(searchTerm) {
  city = searchTerm;
  getAlertsByLocation();
}

displaySearchHistory();
handleHistoryItemClick();
