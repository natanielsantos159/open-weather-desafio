import React, { useContext } from "react";
import Image from "next/image";
import { AppContext } from "../context/AppContext";
import translations from "../public/locales";

export default function LanguageSwitcher() {
  const { lang, setLang } = useContext(AppContext);

  return (
    <div>
      <div>
        <Image
          onClick={() => setLang("pt-BR")}
          height="20px"
          width="20px"
          alt="Brasil Icon"
          src="/assets/brasil.png"
        />
        <Image
          onClick={() => setLang("en-US")}
          height="20px"
          width="20px"
          alt="Estados Unidos Icon"
          src="/assets/estados-unidos.png"
        />
        <Image
          onClick={() => setLang("es")}
          height="20px"
          width="20px"
          alt="Espanha icon"
          src="/assets/espanha.png"
        />
      </div>
      <span>{translations[lang].titles.selected_language}:</span>
      <span>{translations[lang].language_name}:</span>
    </div>
  );
}
