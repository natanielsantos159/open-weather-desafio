import React from "react";
import styles from "../styles/ToggleSwitch.module.css";

export default function ToggleSwitch({ handleSwitch, checked }) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={handleSwitch} checked={checked} />
      <span className={`${styles.round} ${styles.slider}`}></span>
    </label>
  );
}
