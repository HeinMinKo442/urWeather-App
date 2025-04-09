import { formatDate, formatSunTime } from "../utls/TImeManagement";

function ShowWeatherCart({ weather }) {
  return (
    <div className="mt-4 p-4 flex flex-col justify-center">
      <h2 className="text-2xl font-bold justify-start">
        {weather.name},{weather.sys.country}
      </h2>
      <p className="text-md font-normal justify-start">
        {formatDate(weather.dt)}
      </p>
      <div className="items-center flex flex-col justify-center mt-5">
        <img
          className="w-25 h-25"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
        <p className="text-lg font-semibold">
          {weather.weather[0].description}
        </p>
        <p className="text-xl font-bold">Temperature:{weather.main.temp} °C</p>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-15 text-lg font-semibold mt-5">
        <div>
          <p>Feels Like: {weather.main.feels_like} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
        </div>
        <div>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Wind Gusts: {weather.wind.gust} m/s</p>
          <p>Cloudiness: {weather.clouds.all} %</p>
        </div>
        <div>
          <p>Visibility: {weather.visibility} km</p>
          <p>Sunrise: {formatSunTime(weather.sys.sunrise, weather.timezone)}</p>
          <p>Sunset: {formatSunTime(weather.sys.sunset, weather.timezone)}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowWeatherCart;
