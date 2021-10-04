function getDays() {
	let day_0 = new Date();
	day_0.setDate(day_0.getDate());

	let day_1 = new Date();
	day_1.setDate(day_1.getDate() + 1);

	let day_2 = new Date();
	day_2.setDate(day_2.getDate() + 2);

	let day_3 = new Date();
	day_3.setDate(day_3.getDate() + 3);

	let day_4 = new Date();
	day_4.setDate(day_4.getDate() + 4);

	let day_5 = new Date();
	day_5.setDate(day_5.getDate() + 5);

	let day_6 = new Date();
	day_6.setDate(day_6.getDate() + 6);

	let days_num = [
		day_0.getDay(),
		day_1.getDay(),
		day_2.getDay(),
		day_3.getDay(),
		day_4.getDay(),
		day_5.getDay(),
		day_6.getDay(),
	];

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let weekdays = [];

	for (let i = 0; i <= 6; i++) {
		weekdays.push(days[days_num[i]]);
	}

	return weekdays;
}

export default getDays();
