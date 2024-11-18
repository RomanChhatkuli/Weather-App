function convertToLocalTime(dt, timezone) {
  const localTime = new Date((dt + timezone) * 1000);
  return localTime.toLocaleString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}
function getDayOrNight(dt, timezone) {
  const localTime = new Date((dt + timezone) * 1000);
  const hour = localTime.getUTCHours(); // Get the UTC hour (0-23)
  return hour >= 6 && hour < 18 ? "Day" : "Night";
}
function weatherConditions(description, dayOrNight) {
  if (description == "clear sky") {
    return dayOrNight == "Day"
      ? "assets/clear-sky-day.jpeg"
      : "assets/clear-sky-night.jpg";
  } else if (description.includes("rain")) {
    return dayOrNight == "Day"
      ? "assets/rainy-day.jpg"
      : "assets/rainy-night.jpeg";
  } else if (description.includes("clouds")) {
    return dayOrNight == "Day"
      ? "assets/cloudy-day.JPG"
      : "assets/cloudy-night.jpg";
  } else if (description.includes("snow")) {
    return "assets/snow.jpg";
  } else if (description.includes("thunderstorm")) {
    return "assets/thunderstorm.jpg";
  } else {
    return "assets/haze.jpg";
  }
}
let API_URL = "https://api.openweathermap.org/data/2.5/weather";
let API_KEY = "a9ec40cf8527236bc246b2d13e608019";

async function getWeatherInfo(city) {
  let response = await fetch(
    `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  let jsonResponse = await response.json();
  return  {
    name: jsonResponse.name,
    temp: jsonResponse.main.temp,
    feels_like: jsonResponse.main.feels_like,
    humidity: jsonResponse.main.humidity,
    description: jsonResponse.weather[0].description,
    wind: jsonResponse.wind.speed,
    icon: jsonResponse.weather[0].icon,
    country: jsonResponse.sys.country,
    timezone: jsonResponse.timezone,
    dt: jsonResponse.dt,
  }
}

export { convertToLocalTime, getDayOrNight, weatherConditions, getWeatherInfo };
