// Function to make the text entered by the user uppercase
export const upperCase = (str) =>
	str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

// Function to convert the meters into kilometers --- used when updating the modal card to convert the visibility value
export const mToKm = (m) => m / 1000;

// Function to convert 24 hour time to 12 hour time with AM and PM
export const formatAMPM = (hours) => {
	let ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	let strTime = hours + ampm;
	return strTime;
};
