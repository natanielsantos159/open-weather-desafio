import Link from "next/link";
import React, { useContext, useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import styles from "../styles/SearchInput.module.css";
import translations from "../public/locales";
import { AppContext } from "../context/AppContext";

export default function SearchInput() {
  const [address, setAddress] = useState("");
  const { lang } = useContext(AppContext);

  return (
    <PlacesAutocomplete value={address} onChange={setAddress}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: translations[lang].messages.type_the_city_name,
              className: `${styles.search_input} ${
                suggestions.length || loading > 0 ? styles.expanded : ""
              }`,
            })}
          />
          <div className={styles.suggestions}>
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
