const baseCountryURL = "https://secure.geonames.org/countryInfoJSON?username=staceylewis";

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

    // populate the select element with options the list of countries
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

document.getElementById('clear-search').onclick = (function () {
    userInputCountry = document.getElementById("country").value = "";
    userInputCity = document.getElementById("city").value = "";
});

function displayMessage() {
    //if no 5*hotels in the city display error message 'no 5* hotels in the city'
    //if there are more than 10 results add 'load more' button
    //if no more results show message 'no more results'
}

//On submit get city value and find 5* hotels in the selected city
//use api to check if there are 5* hotels nearby
function locateHotels() {

}
