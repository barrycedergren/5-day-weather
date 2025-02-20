const axios = require('axios');

const API_KEY = '2560476ea59dc2567929adc1da8ecc6f';

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	console.log('Received request:', req.query.city);
	try {
		const city = req.query.city;
		if (!city) {
			console.log('Error: City parameter is missing');
			return res.status(400).json({ error: 'City parameter is required' });
		}

		console.log(`Fetching weather data for: ${city}`);
		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
		const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;

		const [weatherResponse, forecastResponse] = await Promise.all([
			axios.get(weatherUrl),
			axios.get(forecastUrl),
		]);

		console.log('Weather data fetched successfully');
		return res.status(200).json({
			weather: weatherResponse.data,
			forecast: forecastResponse.data,
		});
	} catch (error) {
		console.error('Error fetching weather data:', error.message);
		return res.status(500).json({ error: 'Failed to fetch weather data' });
	}
}
