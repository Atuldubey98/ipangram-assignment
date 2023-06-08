import { ChangeEventHandler } from "react";
import SelectOptions from "../common/SelectOptions";
export type SelectDepartmentProps = {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  label?: string;
};
export default function SelectDepartment(props: SelectDepartmentProps) {
  const { onChange, value } = props;
  const departMentNames = [
    { value: "", label: "All" },
    { value: "google", label: "Google" },
    { value: "ipangram", label: "Ipangram" },
    { value: "facebook", label: "Facebook" },
    { value: "wipro", label: "Wipro" },
    { value: "wallmart", label: "Wallmart" },
    { value: "NA", label: "NA" },
  ];
  return (
    <SelectOptions
      label={props.label}
      onChange={onChange}
      name="departmentName"
      options={departMentNames}
      value={value}
    />
  );
}
