import { useState } from "react";
import Header from "./components/Hearder";
import SearchInput from "./components/SearchInput";
import ShowWeatherCart from "./components/showWeatherCart";
import { fetchWeatherCity, fetchWeatherForecast } from "./hooks/fetchWeather";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const search = async (city) => {
    if (!city) return;
    // Fetch current weather data
    const data = await fetchWeatherCity(city);
    console.log("current Weather Data => ", data);
    // Fetch forecast data
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const forecastData = await fetchWeatherForecast(lat, lon);
    console.log("Forecast Weather Data => ", forecastData);
    if (data.cod === 200) {
      setWeather(data);
      setError(null);
    } else {
      setError(data.message);
    }
  };
  return (
    <div className="bg-gradient-to-bl from-blue-800 to-gray-400">
      <Header />
      <main className="flex flex-col items-center h-screen">
        <SearchInput search={search} />
        {error && <p className="text-red-400">{error}</p>}
        {weather && <ShowWeatherCart weather={weather} />}
      </main>
      <main className="h-screen">
        <h2>this is second main section</h2>
      </main>
    </div>
  );
}

export default App;
