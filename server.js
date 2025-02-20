const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = '2560476ea59dc2567929adc1da8ecc6f'; // Replace with your OpenWeather API Key

app.use(cors());
app.use(express.json());

console.log('Starting server...');

// Route to get current weather and 5-day forecast
app.get('/weather', async (req, res) => {
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
		res.json({
			weather: weatherResponse.data,
			forecast: forecastResponse.data,
		});
	} catch (error) {
		console.error('Error fetching weather data:', error.message);
		res.status(500).json({ error: 'Failed to fetch weather data' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
