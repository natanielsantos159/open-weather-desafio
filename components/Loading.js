import React from "react";
import { Oval } from "react-loader-spinner";
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Loading() {
  return (
    <Oval
      color="var(--primary-white)"
      secondaryColor="var(--pink)"
      height={100}
      width={100}
      timeout={3000}
    />
  );
}
