const userLocation = document.getElementById("userLocation"),
converter = document.getElementById("converter"),
weatherIcon = document.querySelector(".weatherIcon"),
temperature = document.querySelector(".temperature"),
feelslike = document.querySelector(".feelsLike"),
description = document.querySelector(".description"),
date = document.querySelector(".date"),
city = document.querySelector(".city"),
HValue = document.getElementById("HValue"),
WValue = document.getElementById("WValue"),
SRValue = document.getElementById("SRValue"),
SSValue = document.getElementById("SSValue"),
CValue = document.getElementById("CValue"),
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue"),
update = document.querySelector(".update");
const WEATHER_API_ENDPOINT = `http://api.weatherapi.com/v1/forecast.json?key=3c66bc171dcc417ba5d145328250210&days=8&q=`;
function findUserLocation() {
  fetch(WEATHER_API_ENDPOINT + userLocation.value)
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error.message);
      return;
    }

    city.innerHTML = data.location.name + ", " + data.location.country;
    weatherIcon.style.background = `url(${data.current.condition.icon})`;
    temperature.innerHTML = Math.round(data.current.temp_c.toFixed(1)) + " °C";
    feelslike.innerHTML = "Feels like " + Math.round(data.current.feelslike_c.toFixed(1)) + " °C";
    description.innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp; ${data.current.condition.text}`;
    HValue.innerHTML = data.current.humidity + "<span>%</span>";
    WValue.innerHTML = data.current.wind_kph.toFixed(1) + "<span> km/h </span>";
    PValue.innerHTML = data.current.pressure_mb + "<span> hPa </span>";
    CValue.innerHTML = data.current.cloud + "<span>%</span>";
    UVValue.innerHTML = data.current.uv;
    SRValue.innerHTML = "Sunrise<br>" + data.forecast.forecastday[0].astro.sunrise;
    SSValue.innerHTML = "Sunset<br>" + data.forecast.forecastday[0].astro.sunset;
    date.innerHTML = new Date().toDateString();

    const weeklyDiv = document.getElementById("weekly");
    weeklyDiv.innerHTML = "";

    data.forecast.forecastday.forEach(day => {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.innerHTML = `
        <p>${new Date(day.date).toDateString()}</p>
        <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
        <p>${Math.round(day.day.avgtemp_c)} °C</p>
      `;
      weeklyDiv.appendChild(dayElement);
    });
  })
  .catch(error => console.error(error));
}