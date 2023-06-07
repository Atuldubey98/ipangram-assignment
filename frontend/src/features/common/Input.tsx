import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";
import "./Input.css";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const Input = forwardRef(
  (props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
    return (
      <div className="input__control">
        {props.label ? (
          <label htmlFor={props.name}>
            {props.label}
            {props.required ? <span>*</span> : null}
          </label>
        ) : null}
        <input {...props} ref={ref} />
      </div>
    );
  }
);
export default Input;
