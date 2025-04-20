
import { useState } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { SearchBar } from "@/components/SearchBar";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Valid city list for demonstration purposes
const validCities = [
  "london", "paris", "new york", "tokyo", "sydney", "berlin", "moscow",
  "beijing", "rome", "madrid", "dubai", "singapore", "toronto", "delhi"
];

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
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }
    
    // Check if the city exists in our list (case insensitive)
    const cityExists = validCities.some(
      city => city.toLowerCase() === searchQuery.toLowerCase()
    );
    
    if (!cityExists) {
      setInvalidCity(true);
      toast({
        title: "City not found",
        description: `"${searchQuery}" is not in our database. Please try another city.`,
        variant: "destructive",
      });
      return;
    }
    
    // Reset invalid city state
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
