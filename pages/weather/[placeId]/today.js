import Link from "next/link";
import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import getGeocodeByPlaceId from "../../../services/geocode.service";
import { getTodayWeatherData } from "../../../services/weather.api.service";
import translations from "../../../public/locales";
import styles from "../../../styles/WeatherToday.module.css";
import Image from "next/image";

export const getStaticProps = async (context) => {
  const { placeId } = context.params;
  try {
    const { data } = await getGeocodeByPlaceId(placeId);
    const { lat, lng } = data.results[0].geometry.location;
    const weatherInfo = await getTodayWeatherData({ lat, lng });
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

export default function WeatherToday({ weatherInfo, placeId }) {
  const { degree, lang } = useContext(AppContext);

  return (
    weatherInfo && (
      <div className={styles.weather_info}>
        <h1 className={styles.city_name}>{weatherInfo.city.toUpperCase()}</h1>
        <div className={styles.weather_description}>
          {translations[lang].weathers[weatherInfo.description] ||
            weatherInfo.description}
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
        <Link href={`/weather/${placeId}/5-day`}>
          <a className={styles.five_days_btn}>
            {translations[lang].titles.see_5_days_forecast}
          </a>
        </Link>
      </div>
    )
  );
}
