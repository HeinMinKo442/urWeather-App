import { useState } from "react";
import Header from "./components/Hearder";
import SearchInput from "./components/SearchInput";
import { fetchWeatherCity, fetchWeatherForecast } from "./hooks/fetchWeather";
import ShowWeatherCart from "./components/ShowWeatherCart";
import { dailyForecast } from "./utls/TImeManagement";
import ShowDailyForecast from "./components/ShowDailyForecast";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
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
    const dailyData = dailyForecast(forecastData.list);
    setForecast(dailyData);
    if (data.cod === 200) {
      setWeather(data);
      setError(null);
    } else {
      setError(data.message);
    }
  };
  return (
    <div className="min-h-screen py-6 bg-gradient-to-bl from-blue-800 to-gray-400">
      <Header />
      <main className="flex flex-col items-center">
        <SearchInput search={search} />
        {error && <p className="text-red-400">{error}</p>}
        {weather && <ShowWeatherCart weather={weather} />}
      </main>
      <ShowDailyForecast data={forecast} />
    </div>
  );
}

export default App;
