import APIKEY from "./node_modules/apikey.js";

const searchInput = document.getElementById("search");
const form = document.getElementById("form");
const cardWeather = document.getElementById("card-weather");
const nextDaysContainer = document.getElementById("nextdays-weather");

// const day_0 = new Date();
// const day_1 = new Date(day_0);
// const day_2 = new Date(day_0);
// day_1.setDate(day_1.getDate() + 1);
// day_2.setDate(day_2.setDate() + 1);
// let dayNames = [
// 	"Sunday",
// 	"Monday",
// 	"Tuesday",
// 	"Wednesday",
// 	"Thursday",
// 	"Friday",
// 	"Saturday",
// ];

// console.log(day_0.getDay());
// console.log(day_1.getDay());
// console.log(day_2.getDay());

const location_APIURL = (location) =>
	`https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${location}&appid=${APIKEY}`;

const weather_APIURL = (latitude, longitude) =>
	`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${APIKEY}`;

async function getWeatherByLocation(location) {
	const response = await fetch(location_APIURL(location));
	const responseData = await response.json();
	if (!response.ok) {
		cardWeather.innerHTML = `<p class="error-location">Sorry, we can't find the location<p>`;
	}
	const resp = await fetch(
		weather_APIURL(responseData.coord.lat, responseData.coord.lon)
	);
	const respData = await resp.json();
	console.log(respData);
	updateCard(
		upperCase(location),
		responseData.main.temp,
		responseData.weather[0].icon,
		upperCase(responseData.weather[0].description),
		responseData.main.humidity,
		responseData.wind.speed
	);

	for (let i = 0; i <= 3; i++) {
		nextDaysWeather(
			i,
			respData.daily[i].temp.day,
			respData.daily[i].weather[0].icon,
			upperCase(respData.daily[i].weather[0].description),
			respData.daily[i].humidity,
			respData.daily[i].wind_speed
		);
	}
}
// getWeatherByLocation("Tokyo");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	nextDaysContainer.innerHTML = "";
	getWeatherByLocation(searchInput.value);
});

function updateCard(city, temperature, icon, description, humidity, wind) {
	cardWeather.innerHTML = `			
	<h2 class="city">Weather in ${city}</h2>
	<div class="temperature-and-icon">
		<h1 class="temperature">${temperature}°C</h1>
		<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" class="weather-icon" />
	</div>
	<div class="description"><p>${description}</p></div>
	<div class="humidity"><p>Humidity: ${humidity} %</p></div>
	<div class="wind"><p>Wind speed: ${wind} km/h</p></div>`;
}

function nextDaysWeather(
	dayname,
	temperature,
	icon,
	description,
	humidity,
	wind
) {
	const day = document.createElement("div");
	day.className = "day";
	day.innerHTML = `
		<h2 class="city">${dayname}</h2>
		<div class="temperature-and-icon">
			<h1 class="temperature">${temperature}°C</h1>
			<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" class="weather-icon" />
		</div>
		<div class="description"><p>${description}</p></div>
		<div class="humidity"><p>Humidity: ${humidity} %</p></div>
		<div class="wind"><p>Wind speed: ${wind} km/h</p></div>`;
	nextDaysContainer.appendChild(day);
}

const upperCase = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
