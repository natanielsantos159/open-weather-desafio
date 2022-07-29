import React from "react";
import getGeocodeByPlaceId from "../../../services/geocode.service";
import weatherApi from "../../../services/weather.api.service";

export const getStaticProps = async (context) => {
  const { placeId } = context.params;
  try {
    const { data } = await getGeocodeByPlaceId(placeId);
    const { lat, lng } = data.results[0].geometry.location;
    const wheatherInfo = await getWeatherData({ lat, lng });
    return {
      props: {
        wheatherInfo,
      },
      revalidate: 120
    };
  } catch (err) {
    console.log(err.message);
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const getWeatherData = async ({ lat, lng }) => {
  try {
    const params = { lat, lon: lng, appid: process.env.OPEN_WEATHER_API_KEY };
    const { data } = await weatherApi.get("/data/2.5/weather/", { params });
    const weatherData = {
      city: data.name,
      temp: {
        current: data.main.temp,
        max: data.main.temp_max,
        min: data.main.temp_min,
      },
      icon: data.weather[0]?.icon,
      description: data.weather[0]?.description,
    };
    return weatherData;
  } catch (err) {
    console.log(err.message);
  }
};

export default function WeatherDetails({ wheatherInfo }) {
  console.log(wheatherInfo);
  return <div>Weather</div>;
}
