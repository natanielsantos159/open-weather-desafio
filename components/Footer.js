import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <LanguageSwitcher />
    </footer>
  );
}
