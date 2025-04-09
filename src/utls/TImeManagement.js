// This function takes a unix timestamp and a timezone offset in seconds
// and returns a formatted time string in the format "hh:mm AM/PM".
export function formatSunTime(unixTimestamp, timezoneOffset) {
  const date = new Date((unixTimestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// This function takes a unix timestamp and a timezone offset in seconds
// and returns a formatted date string in the format "Day Month Date, Year".
export function formatDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateOnly(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString("en-US", {
    weekday: "long",
  });
}
export function formatDateOnly2(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString("en-US", {
    day: "numeric",
  });
}

// This function takes a forecasted weather data object and return an array of daily forecast and get 12:00:00 daily data for each day
// and push it into the daily array. It also checks if the date is already seen to avoid duplicates.
export function dailyForecast(data) {
  const daily = [];

  const dateSeen = new Set();
  data.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dateSeen.has(date) && item.dt_txt.includes("12:00:00")) {
      dateSeen.add(date);
      daily.push(item);
    }
  });
  return daily;
}
