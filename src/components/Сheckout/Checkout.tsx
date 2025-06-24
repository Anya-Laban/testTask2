import { useEffect, useState } from "react";
import { Input } from "../Input";
import { MainButton } from "../MainButton";
import arrowBackImg from "../../assets/arrow-back.svg";
import applePayImg from "../../assets/apple-pay.svg";
import s from "./Checkout.module.css";
import { Trans, useTranslation } from "react-i18next";

const defaultFormData = {
  cardNumber: "",
  date: "",
  cvc: "",
};

type Props = {
  totalPrice: number;
};

export const Checkout: React.FC<Props> = ({ totalPrice }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState(defaultFormData);
  const [isSendingData, setIsSendingData] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateCardDate = (val: string): string | null => {
    if (!/^\d{2}\/\d{2}$/.test(val)) {
      return t("invalidFormatMMYY");
    }

    const [monthStr, yearStr] = val.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt("20" + yearStr, 10);

    if (isNaN(month) || isNaN(year)) {
      return t("invalidMonthYearNumber");
    }

    if (month < 1 || month > 12) {
      return t("invalidMonthRange");
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return t("cardExpired");
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    const errors = { cardNumber: "", date: "", cvc: "" };

    if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      errors.cardNumber = t("invalidCardNumber");
      valid = false;
    }

    const errorMessageDate = validateCardDate(formData.date);
    if (errorMessageDate) {
      errors.date = errorMessageDate;
      valid = false;
    }

    if (formData.cvc.length !== 3) {
      errors.cvc = t("invalidCVC");
      valid = false;
    }
    setFormErrors(errors);
    if (!valid) return;

    new Promise((resolve, reject) => {
      setIsSendingData(true);
      setTimeout(() => {
        if (Math.random() < 0.6) {
          resolve("Data sent: " + JSON.stringify(formData, null, 2));
          setFormData(defaultFormData);
        } else {
          reject("Problems arose.");
        }
      }, 5000);
    })
      .then((data) => window.alert(data as string))
      .catch((err) => window.alert(err as string))
      .finally(() => setIsSendingData(false));
  };

  useEffect(() => {
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (prevErrors.cardNumber) {
        updatedErrors.cardNumber = t("invalidCardNumber");
      }

      if (prevErrors.date) {
        const newDateError = validateCardDate(formData.date);
        updatedErrors.date = newDateError || "";
      }

      if (prevErrors.cvc) {
        updatedErrors.cvc = t("invalidCVC");
      }

      return updatedErrors;
    });
  }, [i18n.language]);

  return (
    <div className={s.checkoutBlock}>
      <header className={s.header}>
        <a className={s.header__btnBack} href="/">
          <img src={arrowBackImg} alt="Back button" />
        </a>
        <h2 className={s.header__title}>{t("checkout")}</h2>
      </header>

      <section className={s.subscriptionInfo}>
        <p className={s.trialText}>
          <strong className={s.daysCountInfo}>{t("fiveDaysFree")}</strong>
          <br />
          <span className={s.priceInfo}>{t("pricePlan")}</span>
        </p>
      </section>

      <section className={s.paymentOptions}>
        <button className={s.applePayBtn}>
          <img src={applePayImg} alt="apple pay" />
        </button>

        <div className={s.divider}>
          <span>{t("orPayWithCard")}</span>
        </div>

        <form className={s.cardForm} onSubmit={handleSubmit}>
          <Input
            label={t("cardNumberLabel")}
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
              label={t("expirationDateLabel")}
              placeholder={t("expirationDatePlaceholder")}
              name="date"
              type="text"
              value={formData.date}
              onValueChange={handleChange}
              patternMask="##/##"
              errorMessage={formErrors.date}
            />

            <Input
              label={t("cvcLabel")}
              placeholder="•••"
              name="cvc"
              type="password"
              value={formData.cvc}
              onValueChange={handleChange}
              patternMask="###"
              iconRightTitle={t("cvcIconRightTitle")}
              errorMessage={formErrors.cvc}
            />
          </div>

          <MainButton
            type="submit"
            text={t("payButtonText", { price: totalPrice })}
            isLoading={isSendingData}
          />
        </form>
      </section>

      <p className={s.checkoutNote}>
        <Trans i18nKey="planInfo" components={{ strong: <strong /> }} />
      </p>
    </div>
  );
};
