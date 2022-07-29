import Link from "next/link";
import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

export default function SearchInput() {
  const [address, setAddress] = useState("");

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({ placeholder: "Digite o nome da cidade" })}
          />
          <div>
            {loading ? <div>Carregando...</div> : null}
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
