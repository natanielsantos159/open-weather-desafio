import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ToggleSwitch from "./ToggleSwitch";

export default function Header() {
  const { degree, setDegree } = useContext(AppContext);

  const handleSwitch = () => {
    setDegree(degree === "celsius" ? "fahrenheit" : "celsius");
  }

  return (
    <header>
      <ToggleSwitch handleSwitch={handleSwitch} checked={degree === "celsius"}/>
    </header>
  )
}
