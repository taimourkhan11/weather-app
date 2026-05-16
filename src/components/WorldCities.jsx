import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../api';
import { motion } from 'framer-motion';

const CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Dubai'];

const WorldCities = ({ onCitySelect }) => {
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCitiesData = async () => {
      try {
        const promises = CITIES.map(city => fetchWeather(city).catch(err => null));
        const results = await Promise.all(promises);
        setCitiesData(results.filter(data => data !== null));
      } catch (error) {
        console.error("Error fetching world cities:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCitiesData();
  }, []);

  if (loading || citiesData.length === 0) return null;

  return (
    <div className="mt-12 w-full">
      <h2 className="text-2xl font-bold text-white mb-6">World Weather</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {citiesData.map((data, index) => (
          <motion.div
            key={data.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onCitySelect(data.name)}
            className="glass p-4 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center group"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{data.name}</h3>
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} 
              alt={data.weather[0].description}
              className="w-16 h-16 mb-1 group-hover:scale-110 transition-transform drop-shadow-lg"
            />
            <p className="text-2xl font-bold text-white">{Math.round(data.main.temp)}°</p>
            <p className="text-sm text-white/60 capitalize mt-1">{data.weather[0].description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorldCities;
