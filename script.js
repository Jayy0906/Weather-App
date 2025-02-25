const btn = document.querySelector("#btn");
const apiKey = "4bb7ca69965c7055eacecc234a4a1929";
const weatherInfo = document.querySelector("#weather-info");

async function getWeather() {
  const cityInput = document.querySelector("#city");
  const cityName = cityInput.value.trim();

  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found or API error");

    const data = await res.json();
    renderWeatherData(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function renderWeatherData(data) {
  const tempCelsius = (data.main.temp - 273.15).toFixed(2);
  weatherInfo.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>🌡 Temperature: ${tempCelsius} °C</p>
    <p>☁️ Weather: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
  `;
}

btn.addEventListener("click", getWeather);
getWeather();
