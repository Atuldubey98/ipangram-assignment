import { ChangeEventHandler } from "react";
import SelectOptions from "../common/SelectOptions";
export type SelectCategoryProps = {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  label?: string;
};
export default function SelectCategory(props: SelectCategoryProps) {
  const { onChange, value } = props;
  const categoryNames = [
    { value: "", label: "All" },
    { value: "HR", label: "HR" },
    { value: "IT", label: "IT" },
    { value: "sales", label: "Sales" },
    { value: "product", label: "Product" },
    { value: "marketting", label: "Marketting" },
    { value: "NA", label: "NA" },
  ];
  return (
    <SelectOptions
      label={props.label}
      onChange={onChange}
      name="categoryName"
      options={categoryNames}
      value={value}
    />
  );
}
