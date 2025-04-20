
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export const WeatherCard = ({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
}: WeatherCardProps) => {
  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case "rain":
        return <CloudRain className="w-16 h-16 text-primary" />;
      case "cloudy":
        return <Cloud className="w-16 h-16 text-primary" />;
      default:
        return <Sun className="w-16 h-16 text-primary" />;
    }
  };

  return (
    <Card className="w-full max-w-md p-6 backdrop-blur-lg bg-white/30 shadow-xl rounded-xl animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-dark-purple mb-2">{city}</h2>
        <div className="flex justify-center mb-4">{getWeatherIcon()}</div>
        <p className="text-4xl font-bold text-dark-purple">{temperature}°C</p>
        <p className="text-lg text-dark-purple/80 capitalize">{condition}</p>
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
