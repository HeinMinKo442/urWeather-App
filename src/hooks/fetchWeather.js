const CurrentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const ForecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = import.meta.env.VITE_API_KEY;

// search city weahter codition
export async function fetchWeatherCity(city) {
  try {
    const res = await fetch(
      `${CurrentWeatherUrl}?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) {
      throw new Error("City not found");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchWeatherForecast(lat, lon) {
  try {
    const res = await fetch(
      `${ForecastWeatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    if (res.ok) {
      const forecastData = await res.json();
      return forecastData;
    } else {
      const errorData = await res.json();
      console.error("Error fetching forecast data:", errorData.message);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

// by metric
// by celcius
