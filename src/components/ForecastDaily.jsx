import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// Helper to map Open-Meteo WMO codes to OpenWeatherMap icons and descriptions
export const getWeatherInfo = (code) => {
  const codeMap = {
    0: { icon: '01d', desc: 'Clear sky' },
    1: { icon: '02d', desc: 'Mainly clear' },
    2: { icon: '03d', desc: 'Partly cloudy' },
    3: { icon: '04d', desc: 'Overcast' },
    45: { icon: '50d', desc: 'Fog' },
    48: { icon: '50d', desc: 'Depositing rime fog' },
    51: { icon: '09d', desc: 'Light drizzle' },
    53: { icon: '09d', desc: 'Moderate drizzle' },
    55: { icon: '09d', desc: 'Dense drizzle' },
    56: { icon: '09d', desc: 'Light freezing drizzle' },
    57: { icon: '09d', desc: 'Dense freezing drizzle' },
    61: { icon: '10d', desc: 'Slight rain' },
    63: { icon: '10d', desc: 'Moderate rain' },
    65: { icon: '10d', desc: 'Heavy rain' },
    66: { icon: '13d', desc: 'Light freezing rain' },
    67: { icon: '13d', desc: 'Heavy freezing rain' },
    71: { icon: '13d', desc: 'Slight snow' },
    73: { icon: '13d', desc: 'Moderate snow' },
    75: { icon: '13d', desc: 'Heavy snow' },
    77: { icon: '13d', desc: 'Snow grains' },
    80: { icon: '09d', desc: 'Slight rain showers' },
    81: { icon: '09d', desc: 'Moderate rain showers' },
    82: { icon: '09d', desc: 'Violent rain showers' },
    85: { icon: '13d', desc: 'Slight snow showers' },
    86: { icon: '13d', desc: 'Heavy snow showers' },
    95: { icon: '11d', desc: 'Thunderstorm' },
    96: { icon: '11d', desc: 'Thunderstorm with slight hail' },
    99: { icon: '11d', desc: 'Thunderstorm with heavy hail' },
  };
  return codeMap[code] || { icon: '01d', desc: 'Clear' };
};

const ForecastDaily = ({ data }) => {
  if (!data || !data.daily) return null;

  const { time, weather_code, temperature_2m_max, temperature_2m_min } = data.daily;
  
  // Open-Meteo returns up to 16 days depending on forecast_days, we requested 10
  const daysCount = Math.min(time.length, 10);
  
  const days = [];
  for (let i = 0; i < daysCount; i++) {
    days.push({
      date: new Date(time[i]),
      weatherCode: weather_code[i],
      max: temperature_2m_max[i],
      min: temperature_2m_min[i]
    });
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-3xl p-6 mt-8 w-full"
    >
      <h2 className="text-xl font-semibold mb-4 text-white/90">10-Day Forecast</h2>
      
      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {days.map((day, index) => {
          const { icon, desc } = getWeatherInfo(day.weatherCode);
          const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
          const isToday = index === 0;

          return (
            <div 
              key={day.date.toISOString()} 
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <p className="w-1/4 text-white/90 font-medium">
                {isToday ? 'Today' : format(day.date, 'MMM d')}
              </p>
              
              <div className="flex items-center w-2/4 justify-center gap-3">
                <img src={iconUrl} alt={desc} className="w-10 h-10" />
                <span className="text-sm text-white/70 capitalize hidden sm:block w-24 truncate">
                  {desc}
                </span>
              </div>
              
              <div className="w-1/4 flex justify-end gap-3 font-semibold">
                <span className="text-white">{Math.round(day.max)}°</span>
                <span className="text-white/50">{Math.round(day.min)}°</span>
              </div>
            </div>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
      `}} />
    </motion.div>
  );
};

export default ForecastDaily;
