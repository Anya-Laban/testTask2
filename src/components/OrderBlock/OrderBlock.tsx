import React from "react";
import { OrderItem } from "../OrderItem";
import type { OrderItemType } from "../../types/OrderItemType";
import s from "./OrderBlock.module.css";
import { useTranslation } from "react-i18next";

type Props = {
  items: OrderItemType[];
};

export const OrderBlock: React.FC<Props> = ({ items }) => {
  const { t } = useTranslation();

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className={s.orderBlock}>
      <h2 className={s.orderTitle}>{t("orderInfoTitle")}</h2>
      <p className={s.orderDesc}>{t("orderInfoDescription")}</p>

      <span className={s.divider} />

      {items.map((item) => (
        <React.Fragment key={item.title}>
          <OrderItem title={t(item.title)} desc={t(item.desc)} />
          <span className={s.divider} />
        </React.Fragment>
      ))}

      <p className={s.totalPrice}>
        <span className={s.price}>{totalPrice} UAH</span>
        <span className={s.separator}> / </span>
        <span className={s.month}>{t("perMonth")}</span>
      </p>
    </section>
  );
};
