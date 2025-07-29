const apiKey = "c2628134c3a66581e895067ee6b617fa";

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherBox = document.querySelector('.weather-box');
const locationNotFound = document.querySelector('.location-not-found');

searchBtn.addEventListener('click', () => {
  const city = inputBox.value.trim();
  if (city !== "") {
    getWeather(`${city},IN`); // Ensure it's treated as an Indian city
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();

    // ✅ Check actual API response code
    if (data.cod !== 200) {
      throw new Error("City not found");
    }

    // Show Weather Box
    locationNotFound.classList.add('hidden');
    weatherBox.classList.remove('hidden');

    // Set weather data
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;

    // Set Weather Image
    const weatherCondition = data.weather[0].main;
    switch (weatherCondition) {
      case 'Clouds':
        weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png';
        break;
      case 'Clear':
        weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/869/869869.png';
        break;
      case 'Rain':
        weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/414/414974.png';
        break;
      case 'Snow':
        weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/642/642102.png';
        break;
      case 'Haze':
      case 'Mist':
      case 'Smoke':
        weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png';
        break;
      default:
        weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/861/861059.png';
    }

  } catch (error) {
    weatherBox.classList.add('hidden');
    locationNotFound.classList.remove('hidden');
  }
}
