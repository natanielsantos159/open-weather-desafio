import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ToggleSwitch from "./ToggleSwitch";
import styles from "../styles/Header.module.css";
import BackButton from "./BackButton";
import { useRouter } from "next/router";

export default function Header() {
  const { degree, setDegree } = useContext(AppContext);
  const router = useRouter();

  const handleSwitch = () => {
    setDegree(degree === "celsius" ? "fahrenheit" : "celsius");
  }

  return (
    <header className={styles.header}>
      {router.asPath !== '/' && <BackButton />}
      <div className={styles.temperature_switcher}>
        °F
        <ToggleSwitch handleSwitch={handleSwitch} checked={degree === "celsius"}/>
        °C
      </div>
    </header>
  )
}
