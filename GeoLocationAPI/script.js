navigator.geolocation.getCurrentPosition(
  function (position) {
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);
  },
  function () {
    alert("Could not get position.");
  }
);
