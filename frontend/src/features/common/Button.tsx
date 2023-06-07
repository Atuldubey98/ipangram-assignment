import { ButtonHTMLAttributes } from "react";
import './Button.css';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}
export default function Button(props: ButtonProps) {
  return <button className="btn" {...props}>{props.label}</button>;
}
