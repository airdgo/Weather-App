import APIKEY from "./node_modules/apikey.js";

const searchInput = document.getElementById("search");
const form = document.getElementById("form");

// const APIKEY = "624a1045c7d6dfb1ff081f2e59156af2";
const APIURL = (location) =>
	`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`;

async function getWeatherByLocation(location) {
	const response = await fetch(APIURL(location));
	const responseData = await response.json();
	console.log(
		responseData,
		KtoC(responseData.main.temp),
		responseData.coord.lon,
		responseData.coord.lat
	);
}
form.addEventListener("submit", (e) => {
	e.preventDefault();
	getWeatherByLocation(searchInput.value);
});

const KtoC = (temp) => Math.floor(temp - 273.15);
