import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { getGeocodeByPlaceId } from "../../../services/geocode.service";
import { getFiveDaysForecast } from "../../../services/weather.api.service";
import translations from "../../../public/locales";
import styles from "../../../styles/FiveDays.module.css";
import Image from "next/image";

export const getStaticProps = async (context) => {
  const { placeId } = context.params;
  const { data } = await getGeocodeByPlaceId(placeId);
  const { lat, lng } = data.results[0].geometry.location;

  const weatherInfo = await getFiveDaysForecast({ lat, lng });
  return {
    props: {
      weatherInfo,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default function FiveDays({ weatherInfo }) {
  const { degree, lang } = useContext(AppContext);
  const { city, weatherList } = weatherInfo || {};

  return (
    weatherInfo && (
      <div className={styles.forecast_info}>
        <h1>{city.toUpperCase()}</h1>
        <p>{translations[lang].titles["5_days_forecast"]}</p>

        <table className={styles.day_details_table}>
          <thead></thead>
          <tbody>
            {weatherList.map((info, i) => (
              <tr className={styles.day_details_row} key={i}>
                <td className={styles.weather_date}>{info.date[lang]}</td>
                <td className={styles.weather_icon}>
                  <Image
                    src={`http://openweathermap.org/img/wn/${info.icon}@2x.png`}
                    alt={`${info.description} icon`}
                    height="40px"
                    width="40px"
                  />
                </td>
                <td className={styles.temp_min}>{info.temp[degree].min}</td>
                <td className={styles.temp_line}></td>
                <td className={styles.temp_max}>{info.temp[degree].max}</td>
                <td className={styles.description}>
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
