const map = L.map('taxiMap').setView([1.3692627956207144, 103.81024709856857], 12); //create map

const googleStreetsLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { //create layer change this for maptile
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' //copyright notice
});

googleStreetsLayer.addTo(map); //add layer to map

const api_url = 'https://api.data.gov.sg/v1/transport/taxi-availability'; //change this for api link

const northBtn = document.querySelector("#north");
const westBtn = document.querySelector("#west");
const northeastBtn = document.querySelector("#northeast");
const eastBtn = document.querySelector("#east");
const centralBtn = document.querySelector("#central");

var response;
var data;
var coordinates;
var latitude;
var longitude;
var taxis;
var counter = 0;
var layerGroup = L.layerGroup().addTo(map);

async function getData() {
    response = await fetch(api_url);
    data = await response.json();
    coordinates = data.features[0].geometry.coordinates; //coordinates is inside nested array
    const time = data.features[0].properties.timestamp; //add time if u want
    taxis = data.features[0].properties.taxi_count; //add no. of taxis if u want
    
    document.getElementById('noTaxis').innerHTML =("Total number of taxis: ") + taxis;
    document.getElementById('clock').innerHTML =("Last updated on: ") + moment(time).format('MMMM Do YYYY, h:mm a');
}

showNorth = () => {
    layerGroup.clearLayers();
    counter = 0;

    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];
        
        if (latitude > 1.360 && latitude < 1.471 && longitude > 103.681 && longitude < 103.866) {
          /*  var marker = L.marker([latitude, longitude]);

            newLayer = L.layerGroup([marker]);
            newLayer.addTo(map);*/
            counter++;
            L.marker([latitude, longitude]).addTo(layerGroup);

      /*      var heat = L.heatLayer([ //uncomment for heat map
               [latitude, longitude, 0.2]
           ], {
               radius: 15,
               gradient: { 0.5: 'red', 0.0: 'blue' },
               minOpacity: 0.3
           }).addTo(map);*/
        }
    }
    console.log(counter);
    document.getElementById('perRegion').innerHTML = "Taxis in region: " + counter;
}

function showWest() {
    layerGroup.clearLayers();
    counter = 0;

    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];
        
        if (latitude > 1.159 && latitude < 1.433 && longitude > 103.606 && longitude < 103.791){

          //  L.marker([latitude, longitude]).addTo(layerGroup);

          var heat = L.heatLayer([ //uncomment for heat map
               [latitude, longitude, 0.2]
           ], {
               radius: 15,
               gradient: { 0.5: 'red', 0.0: 'blue' },
               minOpacity: 0.3
           }).addTo(map);
           console.log(latitude.length);
           counter++;
        }
    }
    document.getElementById('perRegion').innerHTML = "Taxis in region: " + counter;
}

function showNE() {
    layerGroup.clearLayers();

    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];

        if (latitude > 1.334 && latitude < 1.404 && longitude > 103.808 && longitude < 104.089){

           // L.marker([latitude, longitude]).addTo(layerGroup);

           var heat = L.heatLayer([ //uncomment for heat map
               [latitude, longitude, 0.2]
           ], {
               radius: 15,
               gradient: { 0.5: 'red', 0.0: 'blue' },
               minOpacity: 0.3
           }).addTo(map);

        }
    }
}

function showEast() {
    layerGroup.clearLayers();

    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];

        if (latitude > 1.310 && latitude < 1.399 && longitude > 103.929 && longitude < 104.043){

           // L.marker([latitude, longitude]).addTo(layerGroup);

           var heat = L.heatLayer([ //uncomment for heat map
               [latitude, longitude, 0.2]
           ], {
               radius: 15,
               gradient: { 0.5: 'red', 0.0: 'blue' },
               minOpacity: 0.3
           }).addTo(map);

        }
    }
}

function showCentral() {
    layerGroup.clearLayers();

    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];

        if (latitude > 1.213 && latitude < 1.373 && longitude > 103.750 && longitude < 103.915){

           // L.marker([latitude, longitude]).addTo(layerGroup);

           var heat = L.heatLayer([ //uncomment for heat map
               [latitude, longitude, 0.2]
           ], {
               radius: 15,
               gradient: { 0.5: 'red', 0.0: 'blue' },
               minOpacity: 0.3
           }).addTo(map);

        }
    }
}

/*   console.log(latitude, longitude);
   if (latitude > 1.310 && latitude < 1.399 && longitude > 103.929 && longitude < 104.043) {
       alert("working");
       //L.marker([latitude, longitude]).addTo(map);
   }
   else if(latitude > 1.334 && latitude < 1.404 && longitude > 103.808 && longitude < 104.089){
       console.log("he");
   }
   else if(latitude > 1.360 && latitude < 1.471 && longitude > 103.681 && longitude < 103.866){

   }
   else if(latitude > 1.213 && latitude < 1.373 && longitude > 103.750 && longitude < 103.915){

   }
   else if(latitude > 1.159 && latitude < 1.433 && longitude > 103.606 && longitude < 103.791){

   }*/ //this is for regions locations
getData();

northBtn.addEventListener("click", showNorth);
westBtn.addEventListener("click", showWest);
northeastBtn.addEventListener("click", showNE);
eastBtn.addEventListener("click", showEast);
centralBtn.addEventListener("click", showCentral);