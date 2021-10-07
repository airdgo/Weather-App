import { mToKm, formatAMPM } from "./helpers.js";

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
export function nextDaysModalHtml(
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
