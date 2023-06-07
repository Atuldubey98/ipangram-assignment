import "./ProfileField.css";
export interface ProfileFieldProps {
  heading: string;
  value: string;
}
export default function ProfileField(props: ProfileFieldProps) {
  const { heading, value } = props;
  return value ? (
    <div className="profile__field">
      <span className="profile__head">{heading} : </span>
      <span className="profile__value">{value}</span>
    </div>
  ) : null;
}
