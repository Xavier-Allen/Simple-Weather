// On Page load start the application
window.addEventListener("load", () => {
  let long;
  let lat;
  let tempretureDescription = document.querySelector(
    ".temperature-description"
  );
  let tempretureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  // Will ask for geolocation from textbox if yes it loads api, if not throw err
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // proxy lets you make requests to api. else Cors err
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/5754f86cf4f495fce250809cfb467173/${lat},${long}`;

      // fetch data
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // Pulls the tempreture and summary from data.currently from API call;
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from API
          tempretureDegree.textContent = temperature;
          tempretureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //Formula for Celcius
          let celsius = (temperature - 32) / (5 / 9);

          // Calling setIcons to set up the weather icon
          setIcons(icon, document.querySelector(".icon"));

          // Change from F to C;
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              tempretureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              tempretureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = "Please enable location";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, skycons[currentIcon]);
  }
});
