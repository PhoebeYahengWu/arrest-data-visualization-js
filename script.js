$(document).ready(function(){

let dropdown = $('#arresttype-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose Arrest Type</option>');
dropdown.prop('selectedIndex', 0);

const url = 'https://data.cityofnewyork.us/resource/uip8-fykc.json';
let obj = {};

$.getJSON(url, function (data) {
    if (data.length) {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        var key = data[i].ofns_desc;
        if (key) obj[key] = true;
      }
    }

    $.each(obj, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', key).text(key.toLowerCase()));
    })

    // let strUser = $("#arresttype-dropdown :selected").val(); 
    // console.log(strUser)


    const lat = data.reduce((t, r) => t + parseFloat(r.latitude), 0) / data.length;

    const lon = data.reduce((t, r) => t + parseFloat(r.longitude), 0) / data.length; 

    var mymap = L.map('mapid').setView([lat, lon], 10);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: pk.eyJ1Ijoic3RhcmR1c3QxOTEiLCJhIjoiY2thNjMzZzdlMDNtdTJ6bWptaTFqa3Y2MSJ9.VIX2KRmemtC5qDAMyL9Jug,
        }
      ).addTo(mymap);

      data.forEach((ele) =>
        L.marker([ele.latitude, ele.longitude]).addTo(mymap).bindPopup(ele.arrest_date.substring(0, 10)).openPopup()
      );

    })
})








