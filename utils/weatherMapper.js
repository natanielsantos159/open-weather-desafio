import getParsedDate from "./dateParser";

const weatherMapper = (item) => {
  return {
    temp: {
      celsius: {
        current: Math.floor(item.main.temp),
        min: Math.floor(item.main.temp_min),
        max: Math.floor(item.main.temp_max),
      },
      fahrenheit: {
        current: Math.floor((item.main.temp * 9) / 5 + 32),
        min: Math.floor((item.main.temp_min * 9) / 5 + 32),
        max: Math.floor((item.main.temp_max * 9) / 5 + 32),
      },
    },
    date: item.dt_txt || null,
    icon: item.weather[0]?.icon,
    description: item.weather[0]?.description,
  };
};

export default weatherMapper;
