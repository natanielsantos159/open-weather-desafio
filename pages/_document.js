import React from "react";
import Document, { Html, Head, NextScript, Main } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    console.log(process.env.GOOGLE_MAPS_API_KEY)
    return (
      <Html lang="pt-br">
        <Head>
          <Script
            strategy="beforeInteractive"
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
