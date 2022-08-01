import capitalize from "./capitalize";

const getParsedDate = (dateString, lang) => {
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

export default getParsedDate;