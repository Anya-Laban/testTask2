import s from "./LanguageSwitcher.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

type Lang = "en" | "ua";

const LangLabels: Record<Lang, string> = {
  en: "Eng",
  ua: "Укр",
};

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang: Lang = i18n.language.startsWith("en") ? "en" : "ua";

  const changeLang = (lang: Lang) => {
    i18n.changeLanguage(lang);
  };

  const toggleLang = () => {
    const newLang: Lang = currentLang === "en" ? "ua" : "en";
    changeLang(newLang);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.desktop}>
        <button
          className={classNames(s.button, {
            [s.button_active]: currentLang === "en",
          })}
          onClick={() => changeLang("en")}
        >
          {LangLabels.en}
        </button>
        <button
          className={classNames(s.button, {
            [s.button_active]: currentLang === "ua",
          })}
          onClick={() => changeLang("ua")}
        >
          {LangLabels.ua}
        </button>
      </div>

      <div className={s.mobile}>
        <button onClick={toggleLang} className={s.button}>
          {LangLabels[currentLang]}
        </button>
      </div>
    </div>
  );
};
