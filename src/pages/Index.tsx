
import { useState } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { SearchBar } from "@/components/SearchBar";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState({
    city: "London",
    temperature: 22,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
  });
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
        <WeatherCard {...weatherData} />
      </div>
    </div>
  );
};

export default Index;
