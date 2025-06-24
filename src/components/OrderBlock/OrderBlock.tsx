import React from "react";
import { OrderItem } from "../OrderItem";
import type { OrderItemType } from "../../types/OrderItemType";
import s from "./OrderBlock.module.css";

type Props = {
  items: OrderItemType[];
};

export const OrderBlock: React.FC<Props> = ({ items }) => {
  return (
    <section className={s.orderBlock}>
      <h2 className={s.orderTitle}>Order info {"<"}= 100 char.</h2>
      <p className={s.orderDesc}>Description {"<"}= 400 char.</p>

      <span className={s.divider} />

      {items.map((item) => (
        <React.Fragment key={item.title}>
          <OrderItem title={item.title} desc={item.desc} />
          <span className={s.divider} />
        </React.Fragment>
      ))}

      <p className={s.totalPrice}>
        <span className={s.price}>
          {items.reduce((sum, item) => sum + item.price, 0)} UAH
        </span>
        <span className={s.separator}> / </span>
        <span className={s.month}>month</span>
      </p>
    </section>
  );
};
