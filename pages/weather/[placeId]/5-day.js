import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import getGeocodeByPlaceId from "../../../services/geocode.service";
import weatherApi from "../../../services/weather.api.service";
import translations from "../../../public/locales";

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
    cnt: 5,
    units: "metric",
    appid: process.env.OPEN_WEATHER_API_KEY,
  };
  const { data } = await weatherApi.get(`data/2.5/forecast/`, { params });
  const { city, list } = data;
  const weatherList = list.map((item) => {
    return {
      temp: {
        celsius: {
          min: item.main.temp_min,
          max: item.main.temp_max,
        },
        fahrenheit: {
          min: (item.main.temp_min * 9) / 5 + 32,
          max: (item.main.temp_max * 9) / 5 + 32,
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
  }

  const getParsedDate = (dateString) => {
    const date = new Date(dateString);
    const day = new Intl.DateTimeFormat(lang, {day: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat(lang, {month: 'long'}).format(date);
    const weekday = new Intl.DateTimeFormat(lang, {weekday: 'long'}).format(date);
    return `${capitalize(weekday).slice(0, 3)}, ${day} ${capitalize(month).slice(0, 3)}`;
  }

  return (
    <div>
      <div>{city}</div>
      <div>
        {weatherList &&
          weatherList.map((info, i) => (
            <div key={i}>
              <div>{getParsedDate(info.date)}</div>
              <div>{info.temp[degree].min}</div>
              <div>{info.temp[degree].max}</div>
              <div>{translations[lang].weathers[info.description.split(' ').join("_")] || ''}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
