
interface City {
  name: string;
  timezone: string;
}

export const cities: City[] = [
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "New York", timezone: "America/New_York" },
  { name: "Paris", timezone: "Europe/Paris" },
  { name: "Sydney", timezone: "Australia/Sydney" },
  { name: "Dubai", timezone: "Asia/Dubai" },
  { name: "Singapore", timezone: "Asia/Singapore" },
  { name: "Rio de Janeiro", timezone: "America/Sao_Paulo" }
];

export const getRandomCity = (): City => {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
};
