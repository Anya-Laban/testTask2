import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      checkout: "Checkout",
      poweredBy: "Powered by",
      fiveDaysFree: "5 days free",
      pricePlan: "then 299.99 UAH per 14 days",
      orPayWithCard: "or pay with card",
      planInfo:
        "You'll have your <strong>Plan Pro during 1 year</strong>. After this period of time, your plan will be <strong>automatically renewed</strong> with its original price without any discounts applied.",

      cardNumberLabel: "Card Number",
      expirationDateLabel: "Expiration Date",
      cvcLabel: "CVC",
      expirationDatePlaceholder: "MM/YY",
      cvcIconRightTitle: "The 3-digit code on the back of your card.",
      invalidFormatMMYY: "Invalid format. Use MM/YY.",
      invalidMonthYearNumber: "Month or year is not a valid number.",
      invalidMonthRange: "Month must be between 01 and 12.",
      cardExpired: "Card has expired.",
      invalidCardNumber: "The card number is incorrect.",
      invalidCVC: "CVC has 3 digits.",
      payButtonText: "Pay {{price}} UAH",

      orderInfoTitle: "Order info (≤ 100 char.)",
      orderInfoDescription: "Description (≤ 400 char.)",
      perMonth: "month",
    },
  },
  ua: {
    translation: {
      checkout: "Оформлення замовлення",
      poweredBy: "Працює на",
      fiveDaysFree: "5 днів безкоштовно",
      pricePlan: "тоді 299,99 грн. за 14 днів",
      orPayWithCard: "або оплатити картою",
      planInfo:
        "Ви матимете свій <strong>Plan Pro протягом 1 року</strong>. Після цього періоду ваш план буде <strong>автоматично поновлений</strong> за початковою ціною без жодних знижок.",

      cardNumberLabel: "Номер картки",
      expirationDateLabel: "Термін дії",
      cvcLabel: "CVC",
      expirationDatePlaceholder: "ММ/РР",
      cvcIconRightTitle: "3-значний код на звороті картки.",
      invalidFormatMMYY: "Невірний формат.",
      invalidMonthYearNumber: "Місяць або рік не є валідним числом.",
      invalidMonthRange: "Місяць має бути між 01 та 12.",
      cardExpired: "Термін дії картки минув.",
      invalidCardNumber: "Невірний номер картки.",
      invalidCVC: "CVC має містити 3 цифри.",
      payButtonText: "Сплатити {{price}} грн",

      orderInfoTitle: "Інформація про замовлення (≤ 100 символів)",
      orderInfoDescription: "Опис (≤ 400 символів)",
      perMonth: "місяць",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
