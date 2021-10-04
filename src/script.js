// Import modules
import APIKEY from "./apikey.js";
import getDays from "./getDays.js";

// Loading spinner
window.addEventListener("load", () => {
	const loader = document.querySelector(".loader");
	console.log(loader);
	loader.classList.add("hidden");
});

// Get elements from the HTML
const searchInput = document.getElementById("search");
const form = document.getElementById("form");
const cardWeather = document.getElementById("card-weather");
const nextDaysContainer = document.getElementById("nextdays-weather");

// Define API funcions
const location_APIURL = (location) =>
	`https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${location}&appid=${APIKEY}`;

const weather_APIURL = (latitude, longitude) =>
	`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${APIKEY}`;

// Function to get the weather when the user enters a location
async function getWeatherByLocation(location) {
	const response = await fetch(location_APIURL(location));
	const responseData = await response.json();

	// Check if the location entered exists
	if (!response.ok) {
		cardWeather.innerHTML = `<p class="error-location">Sorry, we can't find the location<p>`;
	}
	const resp = await fetch(
		weather_APIURL(responseData.coord.lat, responseData.coord.lon)
	);

	const respData = await resp.json();
	console.log(respData);

	// Current weather displayed on the card
	updateCard(
		upperCase(location),
		responseData.main.temp,
		responseData.weather[0].icon,
		upperCase(responseData.weather[0].description),
		responseData.main.humidity,
		responseData.wind.speed
	);

	// Weather for the next days
	for (let i = 0; i <= 3; i++) {
		let day_x = new Date(); // get the current date
		day_x.setDate(day_x.getDate() + i); // get the day number

		nextDaysWeather(
			getDays[[day_x.getDay()]],
			respData.daily[i].temp.day,
			respData.daily[i].weather[0].icon,
			upperCase(respData.daily[i].weather[0].description),
			respData.daily[i].humidity,
			respData.daily[i].wind_speed
		);
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	nextDaysContainer.innerHTML = "";
	getWeatherByLocation(searchInput.value);
});

// Function to display the curren weather
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

// Function to display the weather for the next days
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

// Function to make the text entered by the user uppercase
const upperCase = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
