const map = L.map('taxiMap').setView([1.3592627956207144, 103.81024709856857], 12); //create map

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
const toggleBtn = document.querySelector("#toggle");

var response;
var data;
var coordinates;
var latitude;
var longitude;
var taxis;
var counter = 0;
var layerGroup = L.layerGroup().addTo(map);
var setToggle = false;

async function getData() {
    response = await fetch(api_url);
    data = await response.json();
    coordinates = data.features[0].geometry.coordinates; //coordinates is inside nested array
    const time = data.features[0].properties.timestamp; //add time if u want
    taxis = data.features[0].properties.taxi_count; //add no. of taxis if u want
    
    document.getElementById('noTaxis').innerHTML = ("Total number of taxis: ") + taxis;
    document.getElementById('clock').innerHTML = ("Last updated on: ") + new Date().toLocaleString();
}

function showNorth() {
    layerGroup.clearLayers();
    counter = 0;
    
    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];
        
        if (latitude > 1.360 && latitude < 1.471 && longitude > 103.681 && longitude < 103.866) {
          /*  var marker = L.marker([latitude, longitude]);

            newLayer = L.layerGroup([marker]);
            newLayer.addTo(map);*/
            if(setToggle === false){
                L.marker([latitude, longitude]).addTo(layerGroup);
            }
            else if(setToggle === true){
                var heat = L.heatLayer([ 
                [latitude, longitude, 0.2]
            ], {
                minOpacity: 0.4,
                radius: 20,
                gradient: { 0.5: 'red', 0.0: 'blue' }
            }).addTo(layerGroup);
            }
            counter++;
        }
    }
    document.getElementById('perRegion').innerHTML = "Taxis in region: " + counter;
}

function showWest() {
    layerGroup.clearLayers();
    counter = 0;

    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];
        
        if (latitude > 1.159 && latitude < 1.433 && longitude > 103.606 && longitude < 103.791){

            if(setToggle === false){
                L.marker([latitude, longitude]).addTo(layerGroup);
            }
            else if(setToggle === true){
                var heat = L.heatLayer([ 
                [latitude, longitude, 0.2]
            ], {
                minOpacity: 0.4,
                radius: 20,
                gradient: { 0.5: 'red', 0.0: 'blue' }
            }).addTo(layerGroup);
            }
           counter++;
        }
    }
    document.getElementById('perRegion').innerHTML = "Taxis in region: " + counter;
}

function showNE() {
    layerGroup.clearLayers();
    counter = 0;

    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];

        if (latitude > 1.334 && latitude < 1.404 && longitude > 103.808 && longitude < 104.089){

            if(setToggle === false){
                L.marker([latitude, longitude]).addTo(layerGroup);
            }
            else if(setToggle === true){
                var heat = L.heatLayer([
                [latitude, longitude, 0.2]
            ], {
                minOpacity: 0.4,
                radius: 20,
                gradient: { 0.5: 'red', 0.0: 'blue' }
            }).addTo(layerGroup);
            }
           counter++;
        }
    }
    document.getElementById('perRegion').innerHTML = "Taxis in region: " + counter;
}

function showEast() {
    layerGroup.clearLayers();
    counter = 0;

    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];

        if (latitude > 1.310 && latitude < 1.399 && longitude > 103.929 && longitude < 104.043){

            if(setToggle === false){
                L.marker([latitude, longitude]).addTo(layerGroup);
            }
            else if(setToggle === true){
                var heat = L.heatLayer([ 
                [latitude, longitude, 0.2]
            ], {
                minOpacity: 0.4,
                radius: 20,
                gradient: { 0.5: 'red', 0.0: 'blue' }
            }).addTo(layerGroup);
            }
           counter++;
        }
    }
    document.getElementById('perRegion').innerHTML = "Taxis in region: " + counter;
}

function showCentral() {
    layerGroup.clearLayers();
    counter = 0;

    for (let i = 0; i < coordinates.length; i++) {
        latitude = coordinates[i][1];
        longitude = coordinates[i][0];

        if (latitude > 1.213 && latitude < 1.373 && longitude > 103.750 && longitude < 103.915){
            
            if(setToggle === false){
                L.marker([latitude, longitude]).addTo(layerGroup);
            }
            else if(setToggle === true){
                var heat = L.heatLayer([ 
                [latitude, longitude, 0.2]
            ], {
                radius: 15,
                gradient: { 0.5: 'red', 0.0: 'blue' },
                minOpacity: 0.3
            }).addTo(layerGroup);
            }
           counter++;
        }
    }
    document.getElementById('perRegion').innerHTML = "Taxis in region: " + counter;
}

function changeMarker(e){
    layerGroup.clearLayers();
    if(setToggle === false){
        e.target.innerText = "Showing: Heat Map";
        setToggle = true;
    }
    else{
        e.target.innerText = "Showing: Markers";
        setToggle = false;
    }
}

getData();

northBtn.addEventListener("click", () => {
    getData();
    showNorth();
});
westBtn.addEventListener("click", () => {
    getData();
    showWest();
});
northeastBtn.addEventListener("click", () => {
    getData();
    showNE();
});
eastBtn.addEventListener("click", () => {
    getData();
    showEast();
});
centralBtn.addEventListener("click", () => {
    getData();
    showCentral();
});
toggleBtn.addEventListener("click", (e) => {
    changeMarker(e);
})