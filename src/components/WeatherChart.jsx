import React from 'react';
import { format } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const WeatherChart = ({ data }) => {
  if (!data || !data.hourly) return null;

  const { time, temperature_2m } = data.hourly;
  
  const currentHour = new Date().getHours();
  const startIndex = currentHour;
  const chartData = [];
  
  // Get data for the next 24 hours
  for (let i = startIndex; i < startIndex + 24; i++) {
    if (i >= time.length) break;
    const date = new Date(time[i]);
    chartData.push({
      time: i === startIndex ? 'Now' : format(date, 'h a'),
      temp: Math.round(temperature_2m[i])
    });
  }

  // Custom tooltip to look good with the glassmorphism theme
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/50 backdrop-blur-md border border-white/20 p-3 rounded-xl text-white">
          <p className="font-medium text-white/80">{label}</p>
          <p className="text-xl font-bold">{payload[0].value}°</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-3xl p-6 mt-8 w-full h-[300px]"
    >
      <h2 className="text-xl font-semibold mb-4 text-white/90">Temperature Trend</h2>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fde047" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fde047" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.5)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#facc15" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WeatherChart;
