import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PlacesAutocomplete from "react-places-autocomplete";
import styles from "../styles/SearchInput.module.css";

export default function SearchInput() {
  const [address, setAddress] = useState("");
  const { t } = useTranslation();

  return (
    <PlacesAutocomplete value={address} onChange={setAddress}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: t("Digite o nome da cidade"),
              className: `${styles.search_input} ${
                suggestions.length || loading > 0 ? styles.expanded : ""
              }`,
            })}
          />
          <div className={styles.suggestions}>
            {loading ? <div>{t("Carregando...")}</div> : null}
            {suggestions.map((suggestion) => (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className: styles.suggestion_item,
                })}
                key={suggestion.placeId}
              >
                <Link href={`weather/${suggestion.placeId}/today`}>
                  {suggestion.formattedSuggestion.mainText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
