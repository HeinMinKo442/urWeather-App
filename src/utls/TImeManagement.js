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
