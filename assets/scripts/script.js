const baseCountryURL = "https://secure.geonames.org/countryInfoJSON?username=staceylewis";
const allCountries = [];
const allCitiesOfCountry = [];

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
// Get country names from api
function getCountryNames(data) {
    const countryNames = data.geonames;
    console.log(countryNames);

    //loop through the array of countries and display the country name
    for (let i = 0; i < countryNames.length; i++) {
        const country = countryNames[i].countryName;
        allCountries.push({
            countryName: countryNames[i].countryName,
            countryCode: countryNames[i].countryCode,
        });
        console.log(country);
        console.log(allCountries);

    }
}

function getCityNames(data) {
    console.log(data);
    const cityNames = data.geonames;
    console.log(cityNames);

    //loop through the array of cities and display the city name
    for (let i = 0; i < cityNames.length; i++) {
        const city = cityNames[i].name;
        allCitiesOfCountry.push(city);
        console.log(city);
        console.log(allCitiesOfCountry);
    }
}

getData(getCountryNames, baseCountryURL);


function locateHotels() {
    //use api to check if there are 5* hotels nearby
}

function displayMessage() {
    //if no 5*hotels in the city display error message 'no 5* hotels in the city'
    //if there are more than 10 results add 'load more' button
    //if no more results show message 'no more results'
}

function clearSearch() {
    //clear inputs ready for new search
}

