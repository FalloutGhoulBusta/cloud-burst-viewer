
import { useState, useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { SearchBar } from "@/components/SearchBar";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fetchWeatherData, weatherCodes } from "@/utils/weatherUtils";
import { getRandomCity } from "@/utils/cityData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: 0,
    condition: "",
    humidity: 0,
    windSpeed: 0,
    timezone: ""
  });
  const [invalidCity, setInvalidCity] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const fetchRandomCityWeather = async () => {
    const randomCity = getRandomCity();
    try {
      const { weatherData: data, timezone } = await fetchWeatherData(randomCity.name);
      
      const weatherInfo = weatherCodes[data.weathercode] || {
        label: "Unknown weather condition"
      };

      setWeatherData({
        city: randomCity.name,
        temperature: data.temperature,
        condition: weatherInfo.label,
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: data.windspeed,
        timezone
      });
      
    } catch (error) {
      console.error('Error fetching weather:', error);
      // If random city fails, try another one
      fetchRandomCityWeather();
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      const { weatherData: data, timezone } = await fetchWeatherData(searchQuery);
      
      const weatherInfo = weatherCodes[data.weathercode] || {
        label: "Unknown weather condition"
      };

      setWeatherData({
        city: searchQuery,
        temperature: data.temperature,
        condition: weatherInfo.label,
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: data.windspeed,
        timezone
      });
      
      setInvalidCity(false);
      setSearchQuery("");
      
    } catch (error) {
      console.error('Error fetching weather:', error);
      setInvalidCity(true);
      toast({
        title: "City not found",
        description: `"${searchQuery}" is not a valid city. Please try another city name.`,
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Initial weather fetch and periodic updates
  useEffect(() => {
    fetchRandomCityWeather();
    
    // Change city every 10 seconds if no search has been performed
    const interval = setInterval(() => {
      if (!searchQuery && !isSearching) {
        fetchRandomCityWeather();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [searchQuery, isSearching]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue to-primary/10 p-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-dark-purple mb-8">Weather App</h1>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          isSearching={isSearching}
        />
        
        {invalidCity && (
          <Alert variant="destructive" className="mb-6 max-w-md w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              City not found. Please try a different city name.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="animate-fade-in">
          <WeatherCard {...weatherData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
