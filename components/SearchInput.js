import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PlacesAutocomplete from "react-places-autocomplete";

export default function SearchInput() {
  const [address, setAddress] = useState("");
  const { t } = useTranslation();

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({ placeholder: t("Digite o nome da cidade") })}
          />
          <div>
            {loading ? <div>{t('Carregando...')}</div> : null}
            {suggestions.map((suggestion) => (
              <div
                {...getSuggestionItemProps(suggestion)}
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
