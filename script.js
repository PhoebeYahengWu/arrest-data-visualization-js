let dropdown = $('#locality-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose Arrest Type</option>');
dropdown.prop('selectedIndex', 0);

const url = 'https://data.cityofnewyork.us/resource/uip8-fykc.json';
let obj = {};
// Populate dropdown with list of provinces
$.getJSON(url, function (data) {
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        var key = data[i].ofns_desc;
        if (key) obj[key] = true;
      }
    }

    $.each(obj, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', key).text(key.toLowerCase()));
    })
});


// var apiKey = "HbAqyAns3LoXacb0KaH60uoNyxmampoE"
// var zipcode = data.Zip_Code;


// fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${zipcode}`)
//   .then(response => response.json())
//   .then(data => { 
//      var {lat, lng} = data.results[0].locations[0].latLng    
//      var mymap = L.map('mapid').setView([lat, lng], 13);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1Ijoic3RhcmR1c3QxOTEiLCJhIjoiY2thNjMzZzdlMDNtdTJ6bWptaTFqa3Y2MSJ9.VIX2KRmemtC5qDAMyL9Jug'
// }).addTo(mymap);

// var marker = L.marker([lat, lng]).addTo(mymap);

// var circle = L.circle([lat, lng], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);

// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap);
//     });


