import axios from "axios";

export const getWeather = async (location) => {
const q = encodeURIComponent(location);
const apiKey = process.env.OPENWEATHER_API_KEY;
if (!apiKey) throw new Error('Missing OPENWEATHER_API_KEY');


const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${apiKey}`;
try {
const r = await axios.get(url);
const data = r.data;
const temp = Math.round(data.main.temp);
const desc = data.weather?.[0]?.description || 'clear sky';
const city = data.name || location;
return `The weather in ${city} is ${temp}°C with ${desc}.`;
} catch (err) {
console.error('Weather API error:', err?.response?.data || err.message);
return `I couldn't fetch live weather for ${location} right now.`;
}
}
