
import { useState } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { SearchBar } from "@/components/SearchBar";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState({
    city: "London",
    temperature: 22,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
  });
  const [invalidCity, setInvalidCity] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const validateCity = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json&limit=1`
      );
      const data = await response.json();
      return data.length > 0;
    } catch (error) {
      console.error('Error validating city:', error);
      return false;
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
    const isValidCity = await validateCity(searchQuery);
    setIsSearching(false);

    if (!isValidCity) {
      setInvalidCity(true);
      toast({
        title: "City not found",
        description: `"${searchQuery}" is not a valid city. Please try another city name.`,
        variant: "destructive",
      });
      return;
    }

    setInvalidCity(false);
    
    // For now, we'll just update with mock data
    setWeatherData({
      city: searchQuery,
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: ["Sunny", "Cloudy", "Rain"][Math.floor(Math.random() * 3)],
      humidity: Math.floor(Math.random() * 30) + 50,
      windSpeed: Math.floor(Math.random() * 20) + 5,
    });
    
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue to-primary/10 p-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-dark-purple mb-8">Weather App</h1>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />
        
        {invalidCity && (
          <Alert variant="destructive" className="mb-6 max-w-md w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              City not found. Please try a different city name.
            </AlertDescription>
          </Alert>
        )}
        
        <WeatherCard {...weatherData} />
      </div>
    </div>
  );
};

export default Index;
