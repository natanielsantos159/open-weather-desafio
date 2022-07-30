import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ToggleSwitch from "./ToggleSwitch";
import styles from "../styles/Header.module.css";

export default function Header() {
  const { degree, setDegree } = useContext(AppContext);

  const handleSwitch = () => {
    setDegree(degree === "celsius" ? "fahrenheit" : "celsius");
  }

  return (
    <header className={styles.header}>
      <div className={styles.temperature_switcher}>
        °F
        <ToggleSwitch handleSwitch={handleSwitch} checked={degree === "celsius"}/>
        °C
      </div>
    </header>
  )
}
