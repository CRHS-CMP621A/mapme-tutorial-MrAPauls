"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map;
let mapEvent; //make global variables

navigator.geolocation.getCurrentPosition(
  function (position) {
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);
    const coords = [latitude, longitude];

    map = L.map("map").setView(coords, 13);

    // console.log(map); //Task 2.1

    map.on("click", function (mapE) {
      mapEvent = mapE;

      form.classList.remove("hidden");
      inputDistance.focus();
    });

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // L.marker(coords)
    //   .addTo(map)
    //   .bindPopup("A pretty CSS popup.<br> Easily customizable.")
    //   .openPopup();
  },
  function () {
    alert("Could not get position.");
  }
);

// form event listener to check if submitted/completed
form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop refreshing the page on submit

  //get user click location on map
  console.log(mapEvent);
  const lat = mapEvent.latlng.lat;
  const lng = mapEvent.latlng.lng;

  L.marker([lat, lng]) //create pop-up marker after user hits submit.
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();

  form.reset();
});
