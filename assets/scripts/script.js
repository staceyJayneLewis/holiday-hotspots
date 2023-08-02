// remember to do testing on this before anything
function getData() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "https://secure.geonames.org/countryInfoJSON?username=staceylewis");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
      console.log(JSON.parse(this.responseText));
    }
  }
};

getData();