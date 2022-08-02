import React, { useContext } from "react";
import Image from "next/image";
import { getPlaceIdByGeocode } from "../services/geocode.service";
import Router from "next/router";
import styles from "../styles/GeolocationButton.module.css";
import translations from "../public/locales";
import { AppContext } from "../context/AppContext";

export default function GeolocationButton() {
  const { lang } = useContext(AppContext);

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
      alert(translations[lang].messages.geolocation_not_supported);
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
      {translations[lang].titles.use_geolocation}
    </button>
  );
}
