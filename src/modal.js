import APIKEY from "./apikey.js";
import { mToKm, formatAMPM } from "./helpers.js";

// Define API funcions
const location_APIURL = (location) =>
	`https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${location}&appid=${APIKEY}`;

const weather_APIURL = (latitude, longitude) =>
	`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${APIKEY}`;

// Function to update the card modal
export function cardModalHtml(
	feelsLike,
	maxTemp,
	minTemp,
	pressure,
	uvi,
	visibility
) {
	const modal = document.getElementById("modal");
	modal.innerHTML = `
        <h1>Today:</h1>
        <div class="hours"></div>
        <div class="details">
            <div>
                <p>Feels like:</p>
                <span>${Math.round(feelsLike)}°C</span>
                <p>Maximum temperature</p>
                <span>${maxTemp}°C</span>
                <p>Pressure</p>
                <span>${pressure} hPa</span>
            </div>
            <div>
                <p>UV index</p>
                <span>${uvi}</span>
                <p>Minimum temperature</p>
                <span>${minTemp}°C</span>
                <p>Visibility</p>
                <span>${mToKm(visibility)} km</span>
            </div>
        </div>
        <button id="close">Close</button>
    `;
}

// Function to update the hours for the card modal
export function updateHours(respData) {
	let day = new Date();
	day.setHours(day.getHours());
	let hours = [day.getHours()];
	for (let i = 0; i <= 8; i++) {
		day.setHours(day.getHours() + 1);
		hours.push(day.getHours());
		i++;
	}

	for (let i = 0; i <= 5; i++) {
		const div = document.createElement("div");
		div.innerHTML = `
			<p>${formatAMPM(hours[i])}</p>
			<p>${Math.round(respData.hourly[i].temp)}°C</p>
		`;
		document.querySelector(".hours").appendChild(div);
	}
}

// Function to update the modal for the next days
function nextDaysModalHtml(
	day,
	feelsLike,
	maxTemp,
	minTemp,
	pressure,
	uvi,
	visibility
) {
	const modal = document.getElementById("modal");
	modal.innerHTML = `
        <h1>${day}:</h1>
        <div class="details">
            <div>
                <p>Feels like:</p>
                <span>${Math.round(feelsLike)}°C</span>
                <p>Maximum temperature</p>
                <span>${maxTemp}°C</span>
                <p>Pressure</p>
                <span>${pressure} hPa</span>
            </div>
            <div>
                <p>UV index</p>
                <span>${uvi}</span>
                <p>Minimum temperature</p>
                <span>${minTemp}°C</span>
                <p>Visibility</p>
                <span>${mToKm(visibility)} km</span>
            </div>
        </div>
        <button id="close">Close</button>
    `;
}

export async function updateNextDaysModal(location, index, day) {
	// Fetch the data
	const response = await fetch(location_APIURL(location));
	const responseData = await response.json();

	const resp = await fetch(
		weather_APIURL(responseData.coord.lat, responseData.coord.lon)
	);
	const respData = await resp.json();

	// Update the modal html
	nextDaysModalHtml(
		day,
		respData.daily[index].feels_like.day,
		respData.daily[index].temp.max,
		respData.daily[index].temp.min,
		respData.daily[index].pressure,
		respData.daily[index].uvi,
		respData.daily[index].clouds
	);
}
