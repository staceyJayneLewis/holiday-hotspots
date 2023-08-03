const baseURL = "https://secure.geonames.org/countryInfoJSON?username=staceylewis";

//XHR request to get api data
function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

// Get country names from api data
function getCountryName(data) {
    for (let i = 0; i < data.geonames.length; i++) {
        return data.geonames[i];
    };


};

getData(getCountryName);


//When search button clicked check if form is valid and get user input value
document.getElementById("search-form").addEventListener("submit", function () {
    const userInput = document.getElementById("country").value;

    if (this.checkValidity()) {
        //  check value of form input to see if matches country name in api list
        // if name in list display names
        // if not in list display error
    };
});


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

