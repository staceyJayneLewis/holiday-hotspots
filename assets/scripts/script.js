const baseCountryUrl = "https://secure.geonames.org/countryInfoJSON?username=staceylewis";

const apiKey = "wGJuUulJvwhdYGEVjJZpGOZk87efZApG";
const apiSecret = "6Zw2nbDOVPrXjGAS";

const coordinatesKey = "ty4jRD5/f8qUdfROqXXTXQ==QCh68o9Hn09KmaV8";

const formInput = document.getElementById("city");
const searchButton = document.getElementById("submit-search");
const destinationResults = document.getElementById("destination-results");

let longitude;
let latitude;

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
}


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

  allCitiesOfCountry.push('Select a city');

  //loop through the array of cities and display the city name
  for (let i = 0; i < cityNames.length; i++) {
    const city = cityNames[i].name;
    allCitiesOfCountry.push(city);
  }
  document.getElementById("city").innerHTML = allCitiesOfCountry.map((city) => `<option value="${city}">${city}</option>`).join("");
};


//On form change check if form is valid and get user input value
document.getElementById("country").addEventListener("change", function () {
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

// get latitude and longitude from api ninja
const getCoordinates = async (cityName) => {
  const coordinatesUrl = `https://api.api-ninjas.com/v1/city?name=${cityName}`;
  const coordinatesHeaders = {
    "X-Api-Key": coordinatesKey,
  };
  const coordinatesResponse = await fetch(coordinatesUrl, {
    method: "GET",
    headers: coordinatesHeaders,
  });
  const coordinates = await coordinatesResponse.json();
  // convert to integer
  latitude = coordinates[0].latitude;
  longitude = coordinates[0].longitude;
  return coordinates;
};

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
  const amadeusUrl = `https://test.api.amadeus.com/v1/reference-data/shopping/activities?latitude=${lat}&longitude=${long}&radius=5`;
  const amadeusHeaders = {
    "Authorization": `Bearer ${await getToken()}`,
  };
  const amadeusResponse = await fetch(amadeusUrl, {
    method: "GET",
    headers: amadeusHeaders,
  });
  const amadeusData = await amadeusResponse.json();
  return console.log(amadeusData.data);
};

// send fetch request to api
const amadeusFetch = function () {

  destinationResults.innerHTML = `
  <div class="row row-cols-1 row-cols-md-3">
  <div class="col mb-3">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text" id="card-text1">This is a longer card with supporting text below as a natural lead-in
          to additional
          content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col mb-3">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
          content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col mb-3">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
          content.</p>
      </div>
    </div>
  </div>
</div>`;
  const city = formInput.value;
  if (city === "") {
    // please enter a city
  };

  // get the latitude and longitude
  getCoordinates(city).then(() => {
    console.log()

    attractionLocations(latitude, longitude).then((data) => {
      if (data !== undefined) {
        destinationResults.innerHTML = "";

        data.forEach((activity) => {
          destinationResults.insertAdjacentHTML("beforeend", `<div class="card">
        <div class="card-content">
          <h5 class="card-title">${activity.name}</h5>
          <p class="card-text">${activity.category}</p>
          <a href="https://www.google.com/search?q=${activity.name}" class="btn btn-warning" target="_blank">Read More</a>
        </div>
      </div>`);
        });
      } else {
        console.log('not working');
        // no activities found
      }
    });
  });
};

searchButton.addEventListener("click", amadeusFetch);


//clear search button actions
document.getElementById('clear-search').onclick = (function () {
  userInputCountry = document.getElementById("country").value = "";
  userInputCity = document.getElementById("city").value = "";
});
