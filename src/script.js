// Import modules
import APIKEY from "./apikey.js";
import getDays from "./getDays.js";
import { updateCardWeather, nextDaysWeather } from "./displayWeather.js";
import { cardModalHtml, updateHours, updateNextDaysModal } from "./modal.js";
import { query } from "./helpers.js";

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
export const location_APIURL = (location) =>
	`https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${location}&appid=${APIKEY}`;

export const weather_APIURL = (latitude, longitude) =>
	`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${APIKEY}`;

// Function to get the weather when the user enters a location
async function getWeatherByLocation(location) {
	const response = await fetch(location_APIURL(location));
	const responseData = await response.json();

	// Check if the location entered exists

	if (!response.ok) {
		cardWeather.innerHTML = `<p class="error-location">Sorry, we can't find the location.</p>`;
		return;
	}

	const resp = await fetch(
		weather_APIURL(responseData.coord.lat, responseData.coord.lon)
	);

	const respData = await resp.json();
	console.log(responseData);
	console.log(respData);

	// Update backgorund image according to the weather description
	document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${query(
		responseData.weather[0].description
	)}')`;

	// Display the current weather on the card
	updateCardWeather(
		location,
		responseData.main.temp,
		responseData.weather[0].icon,
		responseData.weather[0].description,
		responseData.main.humidity,
		responseData.wind.speed
	);

	// Display the weather for the next days
	for (let i = 0; i <= 7; i++) {
		let day_x = new Date(2021, 10, 1); // get a date with the day index "1"
		day_x.setDate(day_x.getDate() + i); // get the day number
		nextDaysWeather(
			i,
			getDays[day_x.getDay()],
			respData.daily[i].temp.day,
			respData.daily[i].weather[0].icon,
			respData.daily[i].weather[0].description,
			respData.daily[i].humidity,
			respData.daily[i].wind_speed
		);
	}
}

// Update modal for the card
async function updateCardModal(location) {
	// Fetch the data
	const response = await fetch(location_APIURL(location));
	const responseData = await response.json();

	const resp = await fetch(
		weather_APIURL(responseData.coord.lat, responseData.coord.lon)
	);
	const respData = await resp.json();

	// Update the modal html
	cardModalHtml(
		responseData.main.feels_like,
		responseData.main.temp_max,
		responseData.main.temp_min,
		responseData.main.pressure,
		respData.current.uvi,
		responseData.visibility
	);

	// Update the hours
	updateHours(respData);
}

let favourite; // variable to store the input value
// Event listener on form
form.addEventListener("submit", (e) => {
	e.preventDefault();

	nextDaysContainer.innerHTML = ""; // delete previous weather for the next days
	if (searchInput.value === "") {
		cardWeather.innerHTML = `<p class="error-location">Please enter a location!</p>`;
		return;
	}
	getWeatherByLocation(searchInput.value);
	favourite = searchInput.value;
	searchInput.value = "";
});

// Open modal when user clicks the three dots
const modalContainer = document.getElementById("modal_container");
const cardWeather = document.getElementById("card-weather");
cardWeather.addEventListener("click", (e) => {
	let element = e.target;

	if (element.id == "open-details") {
		updateCardModal(favourite);
		modalContainer.classList.add("show");
	}
});

// Open modal for the next days
const next_days_weather = document.getElementById("nextdays-weather");
next_days_weather.addEventListener("click", (e) => {
	// get the id of the card
	let index = e.target.parentElement.id;
	// get the day of each card
	let day = e.target.parentElement.firstElementChild.innerText;
	// update the modal for each card when users clicks the three buttons of the card
	if (e.target.id == "open-details") {
		updateNextDaysModal(favourite, index, day);
		modalContainer.classList.add("show");
	}
});

// Close modal
const modal = document.getElementById("modal");
modal.addEventListener("click", (e) => {
	if (e.target.id == "close") {
		modalContainer.classList.remove("show");
	}
});

// Save favourite location
const saveLocation = document.getElementById("save_location");
saveLocation.addEventListener("click", () => {
	if (favourite === undefined) {
		return;
	}

	localStorage.setItem("Favourite", favourite);
	console.log(localStorage);
});

// Show favourite location
const showFavouriteLocation = document.getElementById("show_favourite");
showFavouriteLocation.addEventListener("click", () => {
	let favouriteLocation = localStorage.getItem("Favourite");
	console.log(favouriteLocation);
	if (favouriteLocation) {
		nextDaysContainer.innerHTML = ""; // delete previous weather for the next days
		getWeatherByLocation(favouriteLocation);
		favourite = favouriteLocation;
	}
});
