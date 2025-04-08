import { useEffect, useState } from "react";
import Header from "./components/Hearder";
import SearchInput from "./components/SearchInput";
import { fetchWeatherCity, fetchWeatherForecast } from "./hooks/fetchWeather";
import ShowWeatherCart from "./components/ShowWeatherCart";
import { dailyForecast } from "./utls/TImeManagement";
import ShowDailyForecast from "./components/ShowDailyForecast";
import SearchHistory from "./components/SearchHistory";

function App() {
  const [weather, setWeather] = useState(null);
  const [searchedHistory, setSearchedHistory] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("search_weather_history")
    );
    if (storedHistory) {
      setSearchedHistory(storedHistory);
    }
  }, []);

  const search = async (city) => {
    if (!city) return;

    // check if your city name is conatin with the search history ,there is no contain add it to the search history array and set to localstorage with at least 5 items
    if (!searchedHistory.includes(city)) {
      const updated = [city, ...searchedHistory].slice(0, 2);
      setSearchedHistory(updated);
      localStorage.setItem("search_weather_history", JSON.stringify(updated));
    }
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
    // console.log(localStorage.getItem("search_weather_history"));
  };
  const clearSearchedHistory = () => {
    setSearchedHistory([]);
    localStorage.remveItem("search_weather_history");
  };
  return (
    <div className="min-h-screen py-6 bg-gradient-to-bl from-blue-800 to-gray-400">
      <Header />
      <main className="flex flex-col items-center">
        <SearchInput search={search} />
        {error && <p className="text-red-400">{error}</p>}
        <SearchHistory storedHistory={searchedHistory} search={search} clearHistory={clearSearchedHistory} />
        {weather && <ShowWeatherCart weather={weather} />}
      </main>
      <ShowDailyForecast data={forecast} />
    </div>
  );
}

export default App;
