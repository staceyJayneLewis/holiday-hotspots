const baseCountryUrl = "https://secure.geonames.org/countryInfoJSON?username=staceylewis";

const apiKey = "z8CK7o1mIVUPGWGYABpztoNBVsBEDp7h";
const apiSecret = "KzlABqAhDJGi3IHj";

const destinationResults = document.getElementById("destination-results");
const destinationHeader = document.getElementById('destination-header');
const destinationCards = document.getElementById('destination-results').innerHTML;
const userInputCity = document.getElementById("city");
const userInputCountry = document.getElementById('country');
const searchButton = document.getElementById('submit-search');
const searchForm = document.getElementById("search-form");
const cityValue = document.getElementById('city').innerHTML;
const clearSearch = document.getElementById('clear-search');
const errorMessage = document.getElementById('error-message');

let allCountries = [];
let allCitiesOfCountry = [];

document.querySelector('.arrow').hidden = true;
document.getElementById('back-to-top').hidden = true;

/** XHR request to get api data
 * from the geonames site
*/
function getData(cb, baseURL) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", baseURL);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
}

/** Get country names from api
 * and push into allCountries array
 * and add each one into option dropdowns
*/
function getCountryNames(data) {
  const countryNames = data.geonames;

  allCountries.push({
    countryName: "Select a country",
    countryCode: "",
  });

  //loop through the array of countries and display the country name
  for (let i = 0; i < countryNames.length; i++) {
    allCountries.push({
      countryName: countryNames[i].countryName,
      countryCode: countryNames[i].countryCode,
    });
  }
  //adding options to the country select
  document.getElementById("country").innerHTML = allCountries.map((country) => `<option value="${country.countryName}">${country.countryName}</option>`).join("");
}

getData(getCountryNames, baseCountryUrl);

/**
 * retrieves city names for selected
 * country which are then listed as
 * options in dropdown
*/
function getCityNames(data) {
  const cityNames = data.geonames;

  //loop through the array of cities and display the city name
  for (let i = 0; i < cityNames.length; i++) {

    allCitiesOfCountry.push({
      name: cityNames[i].name,
      lng: cityNames[i].lng,
      lat: cityNames[i].lat,
    });
  }
  document.getElementById("city").innerHTML = allCitiesOfCountry.map((city) => `<option data-lat="${city.lat}" data-lng="${city.lng}" value="${city.name}">${city.name}</option>`).join("");
}

/**
 * When form is changed check
 * if form is valid and get 
 * user input value 
 */
document.getElementById("country").addEventListener("change", function () {
  const countryValue = document.getElementById("country").value;

  // populate the select element with options
  const countryCode = allCountries.find((country) => country.countryName === countryValue).countryCode;

  if (this.checkValidity()) {
    // check if user input is in the array of countries
    if (countryCode) {
      const baseCityUrl = 'https://secure.geonames.org/searchJSON?username=staceylewis&country=' + countryCode + '&maxRows=1000&style=SHORT';
      getData(getCityNames, baseCityUrl);
    }
  }
});

/** 
 * get token for amadeus api
 * to retreive data on attractions
 * for selected city
 */ 
const getToken = async () => {
  const amadeusUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const amadeusHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const amadeusBody = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`;
  const amadeusResponse = await fetch(amadeusUrl, {
    method: "POST",
    headers: amadeusHeaders,
    body: amadeusBody,
  });
  const amadeusData = await amadeusResponse.json();
  return amadeusData.access_token;
};

/* get location of attractions */
const attractionLocations = async (lat, long) => {

  const amadeusUrl = `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${lat}&longitude=${long}&radius=5`;
  const amadeusHeaders = {
    "Authorization": `Bearer ${await getToken()}`,
  };
  const amadeusResponse = await fetch(amadeusUrl, {
    method: "GET",
    headers: amadeusHeaders,
  });
  const amadeusData = await amadeusResponse.json();
  return amadeusData.data;
};

/* send fetch request to api
and display attractions*/
const amadeusFetch = function (event) {
  event.preventDefault();

  // Change header to name of city
  destinationHeader.innerHTML = document.getElementById('city').value;
  searchButton.disabled = true;
  userInputCity.disabled = true;
  userInputCountry.disabled = true;
  clearSearch.classList.add("active-bg");
  document.querySelector('.arrow').hidden = false;


  const latitude = event.target.city[0].dataset.lat;
  const longitude = event.target.city[0].dataset.lng;
  const clearResults = destinationResults;

  // get the latitude and longitude
  attractionLocations(latitude, longitude).then((data) => {
    if (data !== undefined) {

      clearResults.innerHTML = "";
      document.getElementById('back-to-top').hidden = false;

      data.forEach((activity) => {
        destinationResults.insertAdjacentHTML("beforeend", `<div class="col">
          <div class="card">
            <div class="card-body">
              <p class="card-title">${activity.name}</p>
              <p class="card-text">${activity.category}</p>
              <a href="https://www.google.co.uk/search?q=${activity.name}" class="btn btn-warning" target="_blank">Read More</a>
            </div>
          </div>
        </div>`);
      });
    } else {
      clearResults.innerHTML = "";
      //error Message
      errorMessage.insertAdjacentHTML("afterend", `<div class="container insertedContent alert alert-warning" role="alert">
      <p class="text-center"><strong>Sorry!</strong> We are unable to provide information for <strong>${userInputCity.value}</strong>, please clear search and try another country/city.</p></div>`);
    }
  });
};

searchForm.addEventListener("submit", amadeusFetch);

/**
 * clear search button actions
 * to reset form and results back to
 * its original state
 */
clearSearch.onclick = (function () {
  destinationHeader.innerHTML = 'Popular Destinations';
  searchForm.reset();
  searchButton.disabled = false;
  destinationResults.innerHTML = destinationCards;
  userInputCity.innerHTML = cityValue;
  allCitiesOfCountry = [];
  allCountries = [];
  getData(getCountryNames, baseCountryUrl);
  userInputCity.disabled = false;
  userInputCountry.disabled = false;
  clearSearch.classList.remove("active-bg");
  document.querySelector('.arrow').hidden = true;
  document.getElementById('back-to-top').hidden = true;

  let insertedContent = document.querySelector(".insertedContent");
  if (insertedContent) {
    insertedContent.parentNode.removeChild(insertedContent);
  }
});
