import { SelectHTMLAttributes } from "react";
import "./SelectOptions.css";
export interface SelectOptionsProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  label?: string;
}
export default function SelectOptions(props: SelectOptionsProps) {
  const { options } = props;
  return (
    <div className="input__control">
      {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
      <select {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
