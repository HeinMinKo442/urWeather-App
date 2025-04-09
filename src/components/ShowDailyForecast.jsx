import { formatDateOnly, formatDateOnly2 } from "../utls/TImeManagement";

function ShowDailyForecast({ data }) {
  console.log("this is the daily forecast data", data);
  // Check if data is null or undefined
  return (
    <div className="mb-10 mt-10">
      {data && (
        <h2 className="text-xl font-bold mb-4 underline underline-offset-5 text-center">
          5-Day Forecast
        </h2>
      )}
      <div className="flex gap-5 flex-row flex-wrap justify-center items-center mt-5">
        {data &&
          data.map((item) => (
           
              <div
                key={item.dt}
                className="border-2 w-[230px] rounded-lg p-4 text-center"
              >
                <div className="flex flex-row justify-between items-center">
                  <h2>{formatDateOnly(item.dt)}</h2>
                  <p>{formatDateOnly2(item.dt)}</p>
                </div>
                <img
                  className="w-20 h-20 mx-auto"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />
                <p className="font-semibold">{Math.round(item.main.temp)} °C</p>
                <p className="capitalize">{item.weather[0].description}</p>
              </div>
            
          ))}
      </div>
    </div>
  );
}
export default ShowDailyForecast;
