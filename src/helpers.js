// Function to make the text entered by the user uppercase
export const upperCase = (str) =>
	str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

// Function to convert the meters into kilometers --- used when updating the modal card to convert the visibility value
export const mToKm = (m) => m / 1000;
