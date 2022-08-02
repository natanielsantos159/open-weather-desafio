import React from "react";
import Image from "next/image";
import { getPlaceIdByGeocode } from "../services/geocode.service";
import Router from "next/router";
import styles from "../styles/GeolocationButton.module.css";

export default function GeolocationButton() {
  const redirectToWeatherPage = async (lat, lng) => {
    const placeId = await getPlaceIdByGeocode(lat, lng);
    if (placeId) Router.push(`weather/${placeId}/today`);
  };

  const getUserGeolocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        redirectToWeatherPage(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    } else {
      alert(
        "I'm sorry, but geolocation services are not supported by your browser."
      );
    }
  };

  return (
    <button onClick={getUserGeolocation} className={styles.geolocation_button}>
      <Image
        height="20px"
        width="20px"
        src="/assets/geolocation-icon.svg"
        alt="Geolocation Icon"
      />
      Usar Geolocalização
    </button>
  );
}
