import s from "./OrderItem.module.css";

type Props = {
  title: string;
  desc: string;
};

export const OrderItem: React.FC<Props> = ({ title, desc }) => {
  return (
    <div className={s.item}>
      <h3 className={s.title}>{title}</h3>
      <p className={s.desc}>{desc}</p>
    </div>
  );
};
