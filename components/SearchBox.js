import React from "react";
import { useTranslation } from "react-i18next";
import SearchInput from "./SearchInput";

export default function SearchBox() {
  const { t } = useTranslation();
  return (
    <div className="search-box">
      <h1 className="title">{t("Como está o tempo hoje?")}</h1>
      <SearchInput />
    </div>
  );
}
