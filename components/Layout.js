import React from 'react'
import Footer from './Footer'
import Header from './Header'
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.main_container}>
      <Header />
      { children }
      <Footer />
    </div>
  )
}
