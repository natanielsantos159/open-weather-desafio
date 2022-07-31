import Link from "next/link";
import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import getGeocodeByPlaceId from "../../../services/geocode.service";
import weatherApi from "../../../services/weather.api.service";
import translations from "../../../public/locales";
import styles from "../../../styles/WeatherToday.module.css";
import Image from "next/image";

export const getStaticProps = async (context) => {
  const { placeId } = context.params;
  try {
    const { data } = await getGeocodeByPlaceId(placeId);
    const { lat, lng } = data.results[0].geometry.location;
    const weatherInfo = await getWeatherData({ lat, lng });
    return {
      props: {
        weatherInfo,
        placeId,
      },
      revalidate: 120,
    };
  } catch (err) {
    console.log(err.message);
    return {
      props: {},
    };
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
    const params = {
      lat,
      lon: lng,
      units: "metric",
      appid: process.env.OPEN_WEATHER_API_KEY,
    };
    const { data } = await weatherApi.get("/data/2.5/weather/", { params });
    const weatherData = {
      city: data.name,
      temp: {
        celsius: {
          current: Math.floor(data.main.temp),
          min: Math.floor(data.main.temp_min),
          max: Math.floor(data.main.temp_max),
        },
        fahrenheit: {
          current: Math.floor((data.main.temp * 9) / 5 + 32),
          min: Math.floor((data.main.temp_min * 9) / 5 + 32),
          max: Math.floor((data.main.temp_max * 9) / 5 + 32),
        },
      },
      icon: data.weather[0]?.icon,
      description: data.weather[0]?.description.split(" ").join("_"),
    };
    return weatherData;
  } catch (err) {
    console.log(err.message);
  }
};

export default function WeatherToday({ weatherInfo, placeId }) {
  const { degree, lang } = useContext(AppContext);

  return (
    weatherInfo && (
      <div className={styles.weather_info}>
        <h1 className={styles.city_name}>{weatherInfo.city.toUpperCase()}</h1>
        <div className={styles.weather_description}>
          {translations[lang].weathers[weatherInfo.description]}
        </div>
        <div className={styles.weather_current_wrapper}>
          <div className={styles.weather_current_temp}>
            {weatherInfo.temp[degree].current}
          </div>
          <Image
            className={styles.weather_icon}
            src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`}
            alt={`${weatherInfo.description} Icon`}
            height="120px"
            width="120px"
          />
        </div>
        <div className={styles.weather_temp_info}>
          <div className={styles.weather_max_temp}>
            <span>MAX: </span>
            {weatherInfo.temp[degree].max}
          </div>
          <div className={styles.weather_min_temp}>
            <span>MIN: </span>
            {weatherInfo.temp[degree].min}
          </div>
        </div>
        <Link href={`/weather/${placeId}/5-day`} replace>
          <a className={styles.five_days_btn}>
            {translations[lang].titles.see_5_days_forecast}
          </a>
        </Link>
      </div>
    )
  );
}
