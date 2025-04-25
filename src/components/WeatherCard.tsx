
import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { weatherCodes, getLocalTime } from '@/utils/weatherUtils';

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  timezone?: string;
}

export const WeatherCard = ({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
  timezone = 'UTC'
}: WeatherCardProps) => {
  // Ensure timezone is valid and never empty
  const safeTimezone = timezone && timezone.trim() ? timezone : 'UTC';
  
  const [localTime, setLocalTime] = useState(getLocalTime(safeTimezone));

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(getLocalTime(safeTimezone));
    }, 1000);

    return () => clearInterval(timer);
  }, [safeTimezone]);

  const getWeatherIcon = () => {
    const weatherCode = Object.entries(weatherCodes).find(
      ([_, value]) => value.label.toLowerCase() === condition.toLowerCase()
    );

    if (weatherCode) {
      const [_, data] = weatherCode;
      return localTime.isNight ? data.nightIcon : data.icon;
    }

    return localTime.isNight ? 'moon' : 'sun';
  };

  return (
    <Card className="w-full max-w-md p-6 backdrop-blur-lg bg-white/30 shadow-xl rounded-xl animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-dark-purple mb-2">{city}</h2>
        <div className="flex justify-center mb-4">{getWeatherIcon()}</div>
        <p className="text-4xl font-bold text-dark-purple">{temperature}°C</p>
        <p className="text-lg text-dark-purple/80 capitalize">{condition}</p>
        <div className="mt-2 text-sm text-dark-purple/60">
          <Clock className="inline w-4 h-4 mr-1" />
          <span>{localTime.time}</span>
          <p className="text-xs mt-1">{localTime.date}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-center p-3 bg-white/20 rounded-lg">
          <p className="text-sm text-dark-purple/60">Humidity</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl font-semibold text-dark-purple">{humidity}%</span>
          </div>
        </div>
        <div className="text-center p-3 bg-white/20 rounded-lg">
          <p className="text-sm text-dark-purple/60">Wind Speed</p>
          <div className="flex items-center justify-center gap-1">
            <Wind className="w-4 h-4 text-primary" />
            <span className="text-xl font-semibold text-dark-purple">{windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
