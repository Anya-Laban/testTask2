import React from "react";
import s from "./MainButton.module.css";
import classNames from "classnames";

type Props = {
  type: "submit" | "reset" | "button";
  text: string;
  isLoading: boolean;
};

export const MainButton: React.FC<Props> = ({ type, text, isLoading }) => {
  return (
    <button
      type={type}
      className={classNames(s.button, { [s.button_loading]: isLoading })}
    >
      <span className={s.mainContent}>{text}</span>
      <div className={s.processingContent}>Processing payment</div>
    </button>
  );
};
