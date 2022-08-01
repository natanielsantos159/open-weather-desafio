import axios from "axios";
import weatherMapper from "../utils/weatherMapper";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/",
});

export const getTodayWeatherData = async ({ lat, lng }) => {
  const params = {
    lat,
    lon: lng,
    units: "metric",
    appid: process.env.OPEN_WEATHER_API_KEY,
  };
  const { data } = await weatherApi.get("/data/2.5/weather/", { params });
  const weatherData = {
    city: data.name,
    ...weatherMapper(data),
  };
  return weatherData;
};

export const getFiveDaysForecast = async ({ lat, lng }) => {
  const params = {
    lat,
    lon: lng,
    cnt: 37,
    units: "metric",
    appid: process.env.OPEN_WEATHER_API_KEY,
  };
  const { data } = await weatherApi.get(`data/2.5/forecast/`, { params });
  const { city, list } = data;
  const filteredList = list.filter((item) => item.dt_txt.includes("12:00:00"));

  const weatherList = filteredList.map(weatherMapper);
  return {
    city: city.name,
    weatherList,
  };
};

export default weatherApi;
