import React from "react";
import { useTranslation } from "react-i18next";
import SearchInput from "./SearchInput";
import styles from "../styles/SearchBox.module.css";

export default function SearchBox() {
  const { t } = useTranslation();
  return (
    <div className={styles.search_box}>
      <h1 className={styles.title}>{t("Como está o tempo hoje?")}</h1>
      <SearchInput />
    </div>
  );
}
