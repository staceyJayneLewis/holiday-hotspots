function getData(cb) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "https://secure.geonames.org/countryInfoJSON?username=staceylewis");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
      cb(JSON.parse(this.responseText));
    }
  }
};

function printData(data){
  console.log(data);
};

getData(printData);