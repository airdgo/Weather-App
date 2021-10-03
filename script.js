import APIKEY from "./node_modules/apikey.js";

const searchInput = document.getElementById("search");
const form = document.getElementById("form");
const weather = document.getElementById("weather");

const location_APIURL = (location) =>
	`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`;

const weather_APIURL = (latitude, longitude) =>
	`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${APIKEY}`;

async function getWeatherByLocation(location) {
	const response = await fetch(location_APIURL(location));
	const responseData = await response.json();
	console.log(responseData);
	const resp = await fetch(
		weather_APIURL(responseData.coord.lat, responseData.coord.lon)
	);
	const respData = await resp.json();
	console.log(respData);
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	getWeatherByLocation(searchInput.value);
});
