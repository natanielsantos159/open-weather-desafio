import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function SearchInput() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(result[0]);
    setAddress(value);
    setCoordinates({ lat, lng });
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({ placeholder: "Digite o nome da cidade" })}
          />
          <div>
            {loading ? <div>Carregando...</div> : null}
            {suggestions.map((suggestion) => (
              <div {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
