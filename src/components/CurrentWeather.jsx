import React from 'react';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-8 w-full flex flex-col md:flex-row items-center justify-between"
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl font-bold mb-2">{name}</h1>
        <p className="text-xl text-white/80 capitalize">{weather[0].description}</p>
        <div className="flex items-center mt-6">
          <span className="text-7xl font-extrabold tracking-tighter">
            {Math.round(main.temp)}°
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center mt-6 md:mt-0">
        <img 
          src={iconUrl} 
          alt={weather[0].description} 
          className="w-40 h-40 object-contain drop-shadow-2xl"
        />
      </div>

      <div className="flex flex-row md:flex-col gap-6 mt-6 md:mt-0">
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
          <Thermometer className="text-blue-300" size={24} />
          <div>
            <p className="text-sm text-white/60">Feels like</p>
            <p className="text-lg font-semibold">{Math.round(main.feels_like)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
          <Droplets className="text-blue-300" size={24} />
          <div>
            <p className="text-sm text-white/60">Humidity</p>
            <p className="text-lg font-semibold">{main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
          <Wind className="text-blue-300" size={24} />
          <div>
            <p className="text-sm text-white/60">Wind</p>
            <p className="text-lg font-semibold">{Math.round(wind.speed * 3.6)} km/h</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;
