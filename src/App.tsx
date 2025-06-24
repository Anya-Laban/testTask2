import { useMemo } from "react";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { OrderBlock } from "./components/OrderBlock";
import { Checkout } from "./components/Сheckout";
import { useTranslation } from "react-i18next";
import "./App.css";
import arrowBackImg from "./assets/arrow-back.svg";
import logoImg from "./assets/solid-logo.svg";
import { orderItems } from "./store/orderData";

function App() {
  const { t } = useTranslation();
  const totalPrice = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.price, 0);
  }, []);

  return (
    <div className="page">
      <header className="header">
        <a className="header__btnBack" href="/">
          <img src={arrowBackImg} alt="Back button" />
        </a>
        <h2 className="header__title">{t("checkout")}</h2>
        <LanguageSwitcher />
      </header>

      <main className="main">
        <Checkout totalPrice={totalPrice} />
        <OrderBlock items={orderItems} />
      </main>

      <footer className="footer">
        <p className="footer__text">{t("poweredBy")}</p>
        <img src={logoImg} alt="Solid" />
      </footer>
    </div>
  );
}

export default App;
