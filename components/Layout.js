import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "../styles/Layout.module.css";
import Loading from "./Loading";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, []);

  return (
    <div className={styles.main_container}>
      <Header />
      {loading ? <Loading /> : children}
      <Footer />
    </div>
  );
}
