import React, { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast } from './api';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastHourly from './components/ForecastHourly';
import ForecastDaily from './components/ForecastDaily';
import WeatherChart from './components/WeatherChart';
import WorldCities from './components/WorldCities';
import { Loader2, AlertCircle, CloudSun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
function App() {
  const [city, setCity] = useState('Lahore');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const current = await fetchWeather(cityName);
      const forecast = await fetchForecast(current.coord.lat, current.coord.lon);
      setWeatherData(current);
      setForecastData(forecast);
      setCity(current.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData('Lahore');
  }, []);

  const handleSearch = (newCity) => {
    loadWeatherData(newCity);
  };



  return (
    <div 
      className="min-h-screen transition-colors duration-1000 p-4 md:p-8"
      style={{
        backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Side Logo */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 glass px-4 py-2 rounded-full shadow-lg z-50">
        <CloudSun className="text-yellow-400" size={28} />
        <span className="font-extrabold text-xl tracking-wider text-white">TS Weather</span>
      </div>

      <div className="max-w-4xl mx-auto pt-2">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 drop-shadow-md">Taimour Sultan</h1>
          <p className="text-white/70 text-lg">Worldwide Weather Dashboard</p>
        </div>
        
        <SearchBar onSearch={handleSearch} />

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <Loader2 className="animate-spin text-white w-12 h-12" />
            </motion.div>
          )}

          {error && !loading && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center text-red-200 mt-12"
            >
              <AlertCircle size={48} className="mb-4 text-red-400" />
              <p className="text-xl font-medium">{error}</p>
              <p className="mt-2 opacity-80">Please try searching for another city.</p>
            </motion.div>
          )}

          {!loading && !error && weatherData && forecastData && (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <CurrentWeather data={weatherData} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-8">
                <ForecastHourly data={forecastData} />
                <ForecastDaily data={forecastData} />
              </div>
              <WeatherChart data={forecastData} />
              <WorldCities onCitySelect={handleSearch} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
