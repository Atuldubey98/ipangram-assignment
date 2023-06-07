import "./EmployeeField.css";
export interface EmployeeFieldProps {
  heading: string;
  value: string;
}
export default function EmployeeField(props: EmployeeFieldProps) {
  const { heading, value } = props;
  return value ? (
    <div className="profile__field">
      <span className="profile__head">{heading} : </span>
      <span className="profile__value">{value}</span>
    </div>
  ) : null;
}
