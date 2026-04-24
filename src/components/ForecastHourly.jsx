import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { getWeatherInfo } from './ForecastDaily'; // Reuse the helper

const ForecastHourly = ({ data }) => {
  if (!data || !data.hourly) return null;

  const { time, temperature_2m, weather_code } = data.hourly;
  
  // Find the index of the current hour, or just start from 0 if it's the current day's start
  // Open-Meteo returns hourly data starting from midnight of the first day.
  // We want the next 24 hours starting from the current hour.
  const currentHour = new Date().getHours();
  // Simplified: just take the next 24 hours from current index. 
  // Assuming the first day's 0 index is midnight today.
  const startIndex = currentHour;
  const hourlyData = [];
  
  for (let i = startIndex; i < startIndex + 24; i++) {
    // skip if we run out of data
    if (i >= time.length) break;
    hourlyData.push({
      date: new Date(time[i]),
      temp: temperature_2m[i],
      code: weather_code[i]
    });
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-3xl p-6 mt-8 w-full"
    >
      <h2 className="text-xl font-semibold mb-4 text-white/90">24-Hour Forecast</h2>
      
      <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
        {hourlyData.map((item, index) => {
          const { icon, desc } = getWeatherInfo(item.code);
          const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
          
          return (
            <div 
              key={item.date.toISOString()} 
              className="flex flex-col items-center justify-center min-w-[100px] p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <p className="text-sm text-white/70 whitespace-nowrap">
                {index === 0 ? 'Now' : format(item.date, 'h a')}
              </p>
              <img src={iconUrl} alt={desc} className="w-12 h-12 my-2" />
              <p className="text-lg font-bold">{Math.round(item.temp)}°</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ForecastHourly;
