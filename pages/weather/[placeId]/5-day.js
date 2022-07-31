import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import getGeocodeByPlaceId from "../../../services/geocode.service";
import weatherApi from "../../../services/weather.api.service";
import translations from "../../../public/locales";
import styles from "../../../styles/FiveDays.module.css";
import Image from "next/image";

export const getStaticProps = async (context) => {
  const { placeId } = context.params;
  const { data } = await getGeocodeByPlaceId(placeId);
  const { lat, lng } = data.results[0].geometry.location;

  const wheatherInfo = await fetcheNextFiveDays({ lat, lng });
  return {
    props: {
      wheatherInfo,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const fetcheNextFiveDays = async ({ lat, lng }) => {
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

  const weatherList = filteredList.map((item) => {
    return {
      temp: {
        celsius: {
          min: Math.floor(item.main.temp_min),
          max: Math.floor(item.main.temp_max),
        },
        fahrenheit: {
          min: Math.floor((item.main.temp_min * 9) / 5 + 32),
          max: Math.floor((item.main.temp_max * 9) / 5 + 32),
        },
      },
      date: item.dt_txt,
      icon: item.weather[0]?.icon,
      description: item.weather[0]?.description,
    };
  });
  return {
    city: city.name,
    weatherList,
  };
};

export default function FiveDays({ wheatherInfo }) {
  const { degree, lang } = useContext(AppContext);
  const { city, weatherList } = wheatherInfo || {};

  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const getParsedDate = (dateString) => {
    const date = new Date(dateString);
    const day = new Intl.DateTimeFormat(lang, { day: "numeric" }).format(date);
    const month = new Intl.DateTimeFormat(lang, { month: "long" }).format(date);
    const weekday = new Intl.DateTimeFormat(lang, { weekday: "long" }).format(
      date
    );
    return `${capitalize(weekday).slice(0, 3)}, ${day} ${capitalize(
      month
    ).slice(0, 3)}`;
  };

  return (
    wheatherInfo && (
      <div className={styles.forecast_info}>
        <h1>{city.toUpperCase()}</h1>
        <p>{translations[lang].titles["5_days_forecast"]}</p>

        <table className={styles.day_details_table}>
          <thead></thead>
          <tbody>
            {weatherList.map((info, i) => (
              <tr className={styles.day_details_row} key={i}>
                <td className={styles.weather_date}>
                  {getParsedDate(info.date)}
                </td>
                <Image
                  src={`http://openweathermap.org/img/wn/${info.icon}@2x.png`}
                  alt={`${info.description} icon`}
                  height="40px"
                  width="40px"
                />
                <td className={styles.temp_min}>{info.temp[degree].min}</td>
                <td className={styles.temp_line}></td>
                <td className={styles.temp_max}>{info.temp[degree].max}</td>
                <td>
                  {translations[lang].weathers[
                    info.description.split(" ").join("_")
                  ] || info.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
