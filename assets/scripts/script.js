const baseCountryUrl = "https://secure.geonames.org/countryInfoJSON?username=staceylewis";

const apiKey = "wGJuUulJvwhdYGEVjJZpGOZk87efZApG";
const apiSecret = "6Zw2nbDOVPrXjGAS";

const searchForm = document.getElementById("search-form");
const destinationResults = document.getElementById("destination-results");
const destinationHeader = document.getElementById('destination-header');


//XHR request to get api data
function getData(cb, baseURL) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", baseURL);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
};


const allCountries = [];
const allCitiesOfCountry = [];

// Get country names from api
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
  };
  //adding options to the country select
  document.getElementById("country").innerHTML = allCountries.map((country) => `<option value="${country.countryName}">${country.countryName}</option>`).join("");
};

getData(getCountryNames, baseCountryUrl);


// get city Names
function getCityNames(data) {
  console.log(data);
  const cityNames = data.geonames;
  console.log(cityNames);

  // allCitiesOfCountry.push('Select a city');

  //loop through the array of cities and display the city name
  for (let i = 0; i < cityNames.length; i++) {
    const city = cityNames[i].name;
    const lng = cityNames[i].lng;
    const lat = cityNames[i].lat;
    console.log(city);
    console.log(lng);
    console.log(lat);
    allCitiesOfCountry.push({
      name: cityNames[i].name,
      lng: cityNames[i].lng,
      lat: cityNames[i].lat,
    });
  }
  document.getElementById("city").innerHTML = allCitiesOfCountry.map((city) => `<option data-lat="${city.lat}" data-lng="${city.lng}" value="${city.name}">${city.name}</option>`).join("");
};

//On form change check if form is valid and get user input value
const formValidationCheck = document.getElementById("country").addEventListener("change", function () {
  const userInputCountry = document.getElementById("country").value;

  // populate the select element with options
  const countryCode = allCountries.find((country) => country.countryName === userInputCountry).countryCode;
  const userInputCity = document.getElementById("city").value;

  if (this.checkValidity()) {
    // check if user input is in the array of countries
    if (countryCode) {
      console.log("country found");
      baseCityUrl = 'https://secure.geonames.org/searchJSON?username=staceylewis&country=' + countryCode + '&maxRows=1000&style=SHORT';
      getData(getCityNames, baseCityUrl);
    } else {
      console.log("country not found");
    }
    if (userInputCity === "") {
      console.log("please enter a city");
    }
  };
});


// --------------------------------------------------------

// get token for amadeus api
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



// get location of attractions
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
  console.log(amadeusData);
  console.log(amadeusData.data);
  return amadeusData.data;
};

// send fetch request to api
const amadeusFetch = function (event) {   
  event.preventDefault();

  const city = event.target.city.value;
  const latitude = event.target.city[0].dataset.lat;
  const longitude = event.target.city[0].dataset.lng;
  console.log(longitude);

  if (city === "") {
    // please enter a city
  };

  // get the latitude and longitude
    attractionLocations(latitude, longitude).then((data) => {
      if (data !== undefined) {
        destinationResults.innerHTML = "";

        data.forEach((activity) => {
          destinationResults.insertAdjacentHTML("beforeend", `<div class="card col-md-4 m-3">
        <div class="card-content">
          <h5 class="card-title">${activity.name}</h5>
          <p class="card-text">${activity.category}</p>
          <a href="https://www.google.com/search?q=${activity.name}" class="btn btn-warning" target="_blank">Read More</a>
        </div>
      </div>`);
        });
      } else {
        console.log('no activities found');
        // error message
      }
    });
  };
searchForm.addEventListener("submit", amadeusFetch);


// Change header to name of city
document.getElementById('submit-search').onclick = (function () {
  destinationHeader.innerHTML = document.getElementById('city').value;
});


//clear search button actions
document.getElementById('clear-search').onclick = (function () {
  userInputCountry = document.getElementById("country").value = "";
  userInputCity = document.getElementById("city").value = "";
  destinationHeader.innerHTML = 'Popular Destinations';

});

// module.exports = formValidationCheck;