import { useState } from "react";
import { Input } from "../Input";
import { MainButton } from "../MainButton";
import s from "./Checkout.module.css";
import arrowBackImg from '../../assets/arrow-back.svg';
import applePayImg from '../../assets/apple-pay.svg';

const defaultFormData = {
  cardNumber: "",
  date: "",
  cvc: "",
};

type Props = {
  totalPrice: number;
};

export const Checkout: React.FC<Props> = ({ totalPrice }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState(defaultFormData);
  const [isSendingData, setIsSendingData] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isCardDateValid = (val: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(val)) return false;
    const [monthStr, yearStr] = val.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt("20" + yearStr, 10);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    return month >= 1 && month <= 12 && (year > currentYear || (year === currentYear && month >= currentMonth));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    const errors = { cardNumber: "", date: "", cvc: "" };

    if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      errors.cardNumber = "Номер карти не вірний";
      valid = false;
    }
    if (!isCardDateValid(formData.date)) {
      errors.date = "Дата не вірна або минула";
      valid = false;
    }
    if (formData.cvc.length !== 3) {
      errors.cvc = "CVC має містити 3 цифри";
      valid = false;
    }
    setFormErrors(errors);
    if (!valid) return;

    new Promise((resolve, reject) => {
      setIsSendingData(true);
      setTimeout(() => {
        if (Math.random() < 0.6) {
          resolve("Дані надіслано: " + JSON.stringify(formData, null, 2));
          setFormData(defaultFormData);
        } else {
          reject("Виникли проблеми");
        }
      }, 5000);
    })
      .then((data) => window.alert(data as string))
      .catch((err) => window.alert(err as string))
      .finally(() => setIsSendingData(false));
  };

  return (
    <div className={s.checkoutBlock}>
      <header className={s.header}>
        <a className={s.header__btnBack} href="/">
          <img src={arrowBackImg} alt="Back button" />
        </a>
        <h2 className={s.header__title}>Checkout</h2>
      </header>

      <section className={s.subscriptionInfo}>
        <p className={s.trialText}>
          <strong className={s.daysCountInfo}>5 days free</strong>
          <br />
          <span className={s.priceInfo}>then 299.99 UAH per 14 days</span>
        </p>
      </section>

      <section className={s.paymentOptions}>
        <button className={s.applePayBtn}>
          <img src={applePayImg} alt="apple pay" />
        </button>

        <div className={s.divider}>
          <span>or pay with card</span>
        </div>

        <form className={s.cardForm} onSubmit={handleSubmit}>
          <Input
            label="Card Number"
            placeholder="1234 1234 1234 1234"
            name="cardNumber"
            type="text"
            value={formData.cardNumber}
            onValueChange={handleChange}
            patternMask="#### #### #### ####"
            errorMessage={formErrors.cardNumber}
          />

          <div className={s.cardDetails}>
            <Input
              label="Expiration Date"
              placeholder="MM/YY"
              name="date"
              type="text"
              value={formData.date}
              onValueChange={handleChange}
              patternMask="##/##"
              errorMessage={formErrors.date}
            />

            <Input
              label="CVC"
              placeholder="•••"
              name="cvc"
              type="password"
              value={formData.cvc}
              onValueChange={handleChange}
              patternMask="###"
              iconRightTitle="3-значний код на звороті вашої картки"
              errorMessage={formErrors.cvc}
            />
          </div>

          <MainButton
            type="submit"
            text={`Pay ${totalPrice} UAH`}
            isLoading={isSendingData}
          />
        </form>
      </section>

      <p className={s.checkoutNote}>
        You'll have your <strong>Plan Pro during 1 year</strong>. After this
        period of time, your plan will be <strong>automatically renewed</strong>{" "}
        with its original price without any discounts applied.
      </p>
    </div>
  );
};
