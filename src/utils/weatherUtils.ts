
export interface WeatherCode {
  icon: string;
  nightIcon: string;
  label: string;
}

export const weatherCodes: Record<number, WeatherCode> = {
  0: { icon: 'sun', nightIcon: 'moon', label: 'Clear sky' },
  1: { icon: 'cloud-sun', nightIcon: 'cloud-moon', label: 'Mainly clear' },
  2: { icon: 'cloud-sun', nightIcon: 'cloud-moon', label: 'Partly cloudy' },
  3: { icon: 'cloud', nightIcon: 'cloud', label: 'Overcast' },
  45: { icon: 'smog', nightIcon: 'smog', label: 'Foggy conditions' },
  48: { icon: 'smog', nightIcon: 'smog', label: 'Depositing rime fog' },
  51: { icon: 'cloud-rain', nightIcon: 'cloud-rain', label: 'Light drizzle' },
  53: { icon: 'cloud-rain', nightIcon: 'cloud-rain', label: 'Moderate drizzle' },
  55: { icon: 'cloud-rain', nightIcon: 'cloud-rain', label: 'Dense drizzle' },
  61: { icon: 'cloud-rain', nightIcon: 'cloud-rain', label: 'Slight rain' },
  63: { icon: 'cloud-rain', nightIcon: 'cloud-rain', label: 'Moderate rain' },
  65: { icon: 'cloud-rain', nightIcon: 'cloud-rain', label: 'Heavy rain' },
  71: { icon: 'snowflake', nightIcon: 'snowflake', label: 'Light snow' },
  73: { icon: 'snowflake', nightIcon: 'snowflake', label: 'Moderate snow' },
  75: { icon: 'snowflake', nightIcon: 'snowflake', label: 'Heavy snow' },
  77: { icon: 'snowflake', nightIcon: 'snowflake', label: 'Snow grains' },
  80: { icon: 'cloud-rain', nightIcon: 'cloud-rain', label: 'Light rain showers' },
  81: { icon: 'cloud-rain', nightIcon: 'cloud-rain', label: 'Moderate rain showers' },
  82: { icon: 'cloud-rain', nightIcon: 'cloud-rain', label: 'Violent rain showers' },
  85: { icon: 'snowflake', nightIcon: 'snowflake', label: 'Light snow showers' },
  86: { icon: 'snowflake', nightIcon: 'snowflake', label: 'Heavy snow showers' },
  95: { icon: 'cloud-bolt', nightIcon: 'cloud-bolt', label: 'Thunderstorm' },
  96: { icon: 'cloud-bolt', nightIcon: 'cloud-bolt', label: 'Thunderstorm with light hail' },
  99: { icon: 'cloud-bolt', nightIcon: 'cloud-bolt', label: 'Thunderstorm with heavy hail' }
};

export interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
  time: string;
}

export async function fetchWeatherData(city: string): Promise<{
  weatherData: WeatherData;
  timezone: string;
  lat: number;
  lon: number;
}> {
  // First get coordinates from city name
  const geoResponse = await fetch(
    `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`
  );
  const geoData = await geoResponse.json();
  
  if (!geoData.length) {
    throw new Error('City not found');
  }

  const { lat, lon } = geoData[0];
  
  // Then get weather data
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${lat}&longitude=${lon}&` +
    `current_weather=true&` +
    `temperature_unit=celsius&` +
    `timezone=auto`
  );
  
  const weatherData = await weatherResponse.json();
  
  return {
    weatherData: weatherData.current_weather,
    timezone: weatherData.timezone || 'UTC', // Provide a default timezone if empty
    lat: parseFloat(lat),
    lon: parseFloat(lon)
  };
}

export function getLocalTime(timezone: string = 'UTC'): {
  time: string;
  date: string;
  isNight: boolean;
} {
  // Ensure timezone is never empty
  const safeTimezone = timezone && timezone.trim() ? timezone : 'UTC';
  
  const now = new Date();
  
  try {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: safeTimezone
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: safeTimezone
    });

    const hourFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone: safeTimezone
    });
    
    const hour = parseInt(hourFormatter.format(now));
    const isNight = hour >= 18 || hour < 6;
    
    return {
      time: timeFormatter.format(now),
      date: dateFormatter.format(now),
      isNight
    };
  } catch (error) {
    console.error('Error formatting time with timezone:', safeTimezone, error);
    // Fallback to UTC if there's an error with the provided timezone
    return {
      time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      date: now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      isNight: false // Default to day if we can't determine
    };
  }
}
