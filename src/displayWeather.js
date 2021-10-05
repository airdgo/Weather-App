// Function to display the current weather
export function updateCardWeather(
	city,
	temperature,
	icon,
	description,
	humidity,
	wind
) {
	const cardWeather = document.getElementById("card-weather");
	cardWeather.innerHTML = `			
	<h2 class="city">Weather in ${city}</h2>
	<div class="temperature-and-icon">
		<h1 class="temperature">${temperature}°C</h1>
		<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" class="weather-icon" />
	</div>
	<div class="description"><p>${description}</p></div>
	<div class="humidity"><p>Humidity: ${humidity} %</p></div>
	<div class="wind"><p>Wind speed: ${wind} km/h</p> <button id="open-details"><i class="fas fa-ellipsis-h"></i></button></div>`;
}

// Function to display the weather for the next days
export function nextDaysWeather(
	dayname,
	temperature,
	icon,
	description,
	humidity,
	wind
) {
	const nextDaysContainer = document.getElementById("nextdays-weather");
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
