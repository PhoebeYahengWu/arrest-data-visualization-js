let data = []
let pins = []
let MAP_OBJ = {}

$(document).ready(function () {

  fetchRecords()

  $('#arresttype-dropdown').on('change', handleChange);

  // const url = 'https://data.cityofnewyork.us/resource/uip8-fykc.json';
  // let obj = {};

  // $.getJSON(url, function (data) {
  //   if (data.length) {
  //     console.log(data)
  //     for (let i = 0; i < data.length; i++) {
  //       var key = data[i].ofns_desc;
  //       if (key) obj[key] = true;
  //     }
  //   }

  //   $.each(obj, function (key, entry) {
  //     dropdown.append($('<option></option>').attr('value', key).text(key.toLowerCase()));
  //   })

  //   // let strUser = $("#arresttype-dropdown :selected").val(); 
  //   // console.log(strUser)


  //   // const lat = data.reduce((t, r) => t + parseFloat(r.latitude), 0) / data.length;

  //   // const lon = data.reduce((t, r) => t + parseFloat(r.longitude), 0) / data.length;

  //   // MAP = initMap(lat, lon)


  //   // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
  //   // var mymap = L.map('mapid').setView([lat, lon], 10);

  //   // L.tileLayer(
  //   //   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //   //     maxZoom: 18,
  //   //     id: "mapbox/streets-v11",
  //   //     tileSize: 512,
  //   //     zoomOffset: -1,
  //   //     accessToken: 'pk.eyJ1Ijoic3RhcmR1c3QxOTEiLCJhIjoiY2thNjMzZzdlMDNtdTJ6bWptaTFqa3Y2MSJ9.VIX2KRmemtC5qDAMyL9Jug',
  //   //   }
  //   // ).addTo(mymap);

  //   // var marker = L.marker([51.5, -0.09]).addTo(mymap);

  //   data.forEach((ele) =>
  //     // L.marker([ele.latitude, ele.longitude]).addTo(mymap).bindPopup(ele.arrest_date.substring(0, 10)).openPopup()
  //     L.marker([ele.latitude, ele.longitude]).addTo(MAP)
  //   );


  //   var colorArray = [
  //     "#FFB399",
  //     "#E6B3B3",
  //     "#6680B3",
  //     "#FF99E6",
  //     "#1AB399",
  //     "#4D8066"
  //   ];



  // })
})

async function fetchRecords() {
  const url = 'https://data.cityofnewyork.us/resource/uip8-fykc.json';
  try {
    const response = await $.get(url)
    data = response
    buildDropDown(data)

    MAP_OBJ = initMap(data)
    addMarkers(data)
  } catch (error) {
    console.warn(error.message)
  }
}

function buildDropDown(data) {
  const dropdown = $('#arresttype-dropdown');

  let OPTIONS = new Set()

  data.forEach(record => OPTIONS.add(record.ofns_desc))

  Array
    .from(OPTIONS)
    .sort()
    .forEach(val => dropdown.append(
      $("<option>").val(val).text(val.toLowerCase())
    ))
}

function initMap(data) {
  const lat = data.reduce((t, r) => t + parseFloat(r.latitude), 0) / data.length;

  const lon = data.reduce((t, r) => t + parseFloat(r.longitude), 0) / data.length;

  var mymap = L.map('mapid').setView([lat, lon], 10);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoic3RhcmR1c3QxOTEiLCJhIjoiY2thNjMzZzdlMDNtdTJ6bWptaTFqa3Y2MSJ9.VIX2KRmemtC5qDAMyL9Jug',
    }
  ).addTo(mymap);

  return mymap
}

function addMarkers(data) {
  pins.forEach(p => MAP_OBJ.removeLayer(p))
  pins = []

  data.forEach((ele) =>
    // L.marker([ele.latitude, ele.longitude]).addTo(mymap).bindPopup(ele.arrest_date.substring(0, 10)).openPopup()
    {
      const marker = L.marker([ele.latitude, ele.longitude])
      pins.push(marker)
      MAP_OBJ.addLayer(marker)
    }
  );
}

function handleChange(e) {
  const filtered = data.filter(record => record.ofns_desc === e.target.value)

  addMarkers(filtered)
}