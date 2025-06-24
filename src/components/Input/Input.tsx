import React, { useRef } from "react";
import classNames from "classnames";
import s from "./Input.module.css";
import infoImg from '../../assets/info.svg';

const applyMask = (digits: string, pattern: string) => {
  let result = "";
  let digitIndex = 0;

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === "#") {
      if (digitIndex < digits.length) {
        result += digits[digitIndex];
        digitIndex++;
      } else {
        break;
      }
    } else {
      if (digitIndex < digits.length) {
        result += pattern[i];
      }
    }
  }

  return result;
};

type Props = {
  value: string;
  onValueChange: (name: string, value: string) => void;
  label: string;
  placeholder: string;
  name: string;
  type: "text" | "password";
  errorMessage?: string;
  patternMask?: string;
  iconRightTitle?: string;
};

export const Input: React.FC<Props> = ({
  value,
  onValueChange,
  label,
  placeholder,
  name,
  type,
  errorMessage = "",
  patternMask,
  iconRightTitle,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, "");
    const masked = patternMask ? applyMask(digitsOnly, patternMask) : raw;

    onValueChange(name, masked);

    requestAnimationFrame(() => {
      if (inputRef.current) {
        const pos = masked.length;
        inputRef.current.setSelectionRange(pos, pos);
      }
    });
  };

  return (
    <label className={s.inputBlock}>
      <span className={s.labelText}>{label}</span>
      <div
        className={classNames(s.inputBox, {
          [s.inputBoxError]: errorMessage.length > 1,
        })}
      >
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          className={s.input}
        />

        {iconRightTitle && (
          <span title={iconRightTitle} className={s.info}>
            <img src={infoImg} alt="info" />
          </span>
        )}
      </div>

      {errorMessage && <div className={s.error}>{errorMessage}</div>}
    </label>
  );
};
