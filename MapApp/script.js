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

//Task 3.2 Declare map and mapEvent as global variables
let map;
let mapEvent;
let workouts = [];

//Task 4.1 - create the classes
///// CLASSES ////
class Workout {
  date = Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in kms
    this.duration = duration; //in mins
  }
}

//Task 4.2 - children of workout class
class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration); // from Workout class
    this.cadence = cadence;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration); // from Workout class
    this.elevation = elevationGain;
  }
}

//Task 4.3  Testing Workout classes
const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Cycling([39, -12], 27, 95, 523);
console.log(run1, cycling1);

navigator.geolocation.getCurrentPosition(
  function (position) {
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);
    const coords = [latitude, longitude];

    map = L.map("map").setView(coords, 13);

    // console.log(map);

    map.on("click", function (mapE) {
      mapEvent = mapE; // Task 3.2 - assign the mapE local variable to the global MapEvent variable

      // Task 3.1 - Display user input form on the left of the screen
      form.classList.remove("hidden");
      inputDistance.focus();
    });

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  },
  function () {
    alert("Could not get position.");
  }
);

// form event listener to check if submitted/completed
form.addEventListener("submit", function (e) {
  e.preventDefault(); //Task 3.3 prevent page reload on submit.

  //Task 4.4 - get data from form and map.on
  const type = inputType.value;
  const distance = Number(inputDistance.value);
  const duration = Number(inputDuration.value);
  const lat = mapEvent.latlng.lat;
  const lng = mapEvent.latlng.lng;
  let workout;

  //Task 4.4 continued
  if (type === "running") {
    const cadence = Number(inputCadence.value);

    //validate form data later

    //create new Running Object
    workout = new Running([lat, lng], distance, duration, cadence);
  }

  if (type === "cycling") {
    const elevation = +inputElevation.value;

    //Create new Cycling object
    workout = new Cycling([lat, lng], distance, duration, elevation);
  }

  workouts.push(workout); // add latest workout to array
  //debug
  console.log(workouts);

  // Task 3.3 display map marker whenever form is submitted.
  L.marker([lat, lng])
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

  form.reset(); // Task 3.3 challenge - set input boxes back to default
});

//Task 3.4 - Event Listener Toggle form input type change.
inputType.addEventListener("change", function () {
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
});
