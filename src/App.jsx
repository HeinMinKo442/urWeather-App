import { useEffect, useState } from "react";
import Header from "./components/Hearder";
import SearchInput from "./components/SearchInput";
import { fetchWeatherCity, fetchWeatherForecast } from "./hooks/fetchWeather";
import ShowWeatherCart from "./components/ShowWeatherCart";
import { dailyForecast } from "./utls/TImeManagement";
import ShowDailyForecast from "./components/ShowDailyForecast";
import SearchHistory from "./components/SearchHistory";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import ToggleFandC from "./components/ToggleFandC";

function App() {
  const [weather, setWeather] = useState(null);
  const [searchedHistory, setSearchedHistory] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [city, setCity] = useState("");

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("search_weather_history")
    );
    if (storedHistory) {
      setSearchedHistory(storedHistory);
    }
  }, []);

  // re-fetch when unit change c to f or f to c
  useEffect(() => {
    if (weather && weather.name) {
      const fetchOnUnitChange = async () => {
        const data = await fetchWeatherCity(weather.name, unit);
        if (data.cod == 200) {
          setWeather(data);
          const forecastData = await fetchWeatherForecast(
            data.coord.lat,
            data.coord.lon,
            unit
          );
          const dailyData = dailyForecast(forecastData.list);
          setForecast(dailyData);
        }
      };

      fetchOnUnitChange();
    }
  }, [unit]);

  const clearSearchedHistory = () => {
    alert("Are you sure you want to clear the search history?");
    setSearchedHistory([]);
    localStorage.removeItem("search_weather_history");
    setWeather(null);
    setForecast(null);
  };
  const search = async (city) => {
    if (!city) return;
    setLoading(true);

    // Fetch current weather data
    const data = await fetchWeatherCity(city, unit);
    console.log("current Weather Data with Celsius => ", data);

    if (data.cod === 200) {
      setWeather(data);
      setLoading(false);
      // check if your city name is conatin with the search history ,there is no contain add it to the search history array and set to localstorage with at least 3 items
      if (!searchedHistory.includes(city)) {
        const updated = [city, ...searchedHistory].slice(0, 3);
        setSearchedHistory(updated);
        localStorage.setItem("search_weather_history", JSON.stringify(updated));
      }
      // Fetch forecast data
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const forecastData = await fetchWeatherForecast(lat, lon, unit);
      console.log("Forecast Weather Data => ", forecastData);
      const dailyData = dailyForecast(forecastData.list);
      setForecast(dailyData);
      setError(null);
    } else {
      // console.log("thsi is error msg from app", data.message);
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen py-6 bg-gradient-to-bl from-blue-800 to-gray-400">
      <div className="flex flex-row justify-between items-center px-4">
        <Header />
        <ToggleFandC unit={unit} setUnit={setUnit} />
      </div>
      <main className="flex flex-col items-center">
        <SearchInput
          search={search}
          searchCity={city}
          setSearchCity={setCity}
        />
        {error && <ErrorMessage error={error} />}
        <SearchHistory
          storedHistory={searchedHistory}
          search={search}
          clearHistory={clearSearchedHistory}
        />
        {loading ? (
          <Loading />
        ) : (
          <>
            {weather && <ShowWeatherCart weather={weather} unit={unit} />}
            <ShowDailyForecast data={forecast} unit={unit} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
