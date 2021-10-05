// Import modules
import APIKEY from "./apikey.js";
import getDays from "./getDays.js";
import { updateCardWeather, nextDaysWeather } from "./displayWeather.js";

// Loading spinner
window.addEventListener("load", () => {
	const loader = document.querySelector(".loader");
	loader.classList.add("hidden");
});

// Get elements from the HTML
const searchInput = document.getElementById("search");
const form = document.getElementById("form");
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
	updateCardWeather(
		upperCase(location),
		Math.round(responseData.main.temp),
		responseData.weather[0].icon,
		upperCase(responseData.weather[0].description),
		responseData.main.humidity,
		responseData.wind.speed
	);

	// Weather for the next days
	for (let i = 0; i <= 7; i++) {
		let day_x = new Date(2021, 10, 1); // get a date with the day index "1"
		day_x.setDate(day_x.getDate() + i); // get the day number

		nextDaysWeather(
			getDays[day_x.getDay()],
			Math.round(respData.daily[i].temp.day),
			respData.daily[i].weather[0].icon,
			upperCase(respData.daily[i].weather[0].description),
			respData.daily[i].humidity,
			respData.daily[i].wind_speed
		);
	}
}

// Event listener on form
form.addEventListener("submit", (e) => {
	e.preventDefault();
	nextDaysContainer.innerHTML = ""; // delete previous weather for the next days
	getWeatherByLocation(searchInput.value);
});

const modalContainer = document.getElementById("modal_container");
const cardWeather = document.getElementById("card-weather");
cardWeather.addEventListener("click", (e) => {
	let element = e.target;
	console.log(element);
	if (
		element.id == "open-details" ||
		element.className == "fas fa-ellipsis-h"
	) {
		modalContainer.classList.add("show");
	}
});

// Function to make the text entered by the user uppercase
const upperCase = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
