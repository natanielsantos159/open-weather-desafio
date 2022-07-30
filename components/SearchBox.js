import React, { useContext } from "react";
import SearchInput from "./SearchInput";
import styles from "../styles/SearchBox.module.css";
import { AppContext } from "../context/AppContext";
import translations from "../public/locales";

export default function SearchBox() {
  const { lang } = useContext(AppContext);

  return (
    <div className={styles.search_box}>
      <h1 className={styles.title}>
        {translations[lang].messages.how_is_the_weather}
      </h1>
      <SearchInput />
    </div>
  );
}
