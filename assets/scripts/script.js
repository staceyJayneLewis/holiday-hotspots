const baseCountryURL = "https://secure.geonames.org/countryInfoJSON?username=staceylewis";

const apiKey = "wGJuUulJvwhdYGEVjJZpGOZk87efZApG";
const apiSecret = "6Zw2nbDOVPrXjGAS";

const cityCodeApiKey = "ty4jRD5/f8qUdfROqXXTXQ==QCh68o9Hn09KmaV8";

let cityCode;
let userInputCity;

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

function getCityNames(data) {
    console.log(data);
    const cityNames = data.geonames;
    console.log(cityNames);

    allCitiesOfCountry.push('Select a city');

    //loop through the array of cities and display the city name
    for (let i = 0; i < cityNames.length; i++) {
        const city = cityNames[i].name;
        allCitiesOfCountry.push(city);
        console.log(city);
        console.log(allCitiesOfCountry);
    }
    document.getElementById("city").innerHTML = allCitiesOfCountry.map((city) => `<option value="${city}">${city}</option>`).join("");
};

getData(getCountryNames, baseCountryURL);

//When search button clicked check if form is valid and get user input value
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

//get city code from api ninja
const getCityCode = async (city) => {
    const cityCodeUrl = `https://api.api-ninjas.com/v1/airports?name=${city}`;

    const cityCodeHeaders = {
        "X-Api-Key": cityCodeApiKey,
    };
    
    const cityResponse = await fetch(cityCodeUrl, {
      method: "GET",
      headers: cityCodeHeaders,
    });
    const cityCodeData = await cityResponse.json();

    cityCode = cityCodeData[0].iata;
    return cityCodeData;
    //for loop needed to retrieve iata code
  };

  getCityCode('paris');

//clear search button actions
document.getElementById('clear-search').onclick = (function () {
    userInputCountry = document.getElementById("country").value = "";
    userInputCity = document.getElementById("city").value = "";
});

// get token for amadeus api
const obtainToken = async () => {
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

// // get nearby hotels
// const hotelContent = async () => {
//     const amadeusUrl = `https://test.api.amadeus.com/v3//reference-data/locations/hotels/by-city?cityCode=${PAR}`;
//     const amadeusHeaders = {
//         "Authorization": `Bearer ${await obtainToken()}`,
//     };
//     const amadeusResponse = await fetch(amadeusUrl, {
//         method: "GET",
//         headers: amadeusHeaders,
//     });
//     const amadeusData = await amadeusResponse.json();
//     return amadeusData.data;
// };

