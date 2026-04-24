import axios from 'axios';

const API_KEY = 'ed17d2cc33a4bc86b3d83caf489e9e13';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchForecast = async (lat, lon) => {
  try {
    // We use Open-Meteo for the 10-day forecast because OpenWeatherMap's free tier only supports 5 days
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: 'temperature_2m,weather_code',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: 10
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch 10-day forecast data');
  }
};
