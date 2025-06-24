import { useState } from "react";
import s from "./LanguageSwitcher.module.css";
import classNames from "classnames";

type Lang = "en" | "ua";

const LangLabels: Record<Lang, string> = {
  en: "Eng",
  ua: "Укр",
};

export const LanguageSwitcher = () => {
  const [language, setLanguage] = useState<Lang>("ua");

  const toggleLang = () => {
    setLanguage((prev) => (prev === "en" ? "ua" : "en"));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.desktop}>
        <button
          className={classNames(s.button, {
            [s.button_active]: language === "en",
          })}
          onClick={() => setLanguage("en")}
        >
          {LangLabels["en"]}
        </button>
        <button
          className={classNames(s.button, {
            [s.button_active]: language === "ua",
          })}
          onClick={() => setLanguage("ua")}
        >
          {LangLabels["ua"]}
        </button>
      </div>

      <div className={s.mobile}>
        <button onClick={toggleLang} className={s.button}>
          {LangLabels[language]}
        </button>
      </div>
    </div>
  );
};
