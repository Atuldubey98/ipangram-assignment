import { ChangeEventHandler } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import SelectCategory from "./SelectCategory";
import SelectDepartment from "./SelectDepartment";
import { EmployeeCompanyDetails } from "./EmployeeDetailsUpdateModal";
export type EmployeeDetailsFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChangeDetails: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onChangeSalary: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  empDetails: EmployeeCompanyDetails;
};
export default function EmployeeDetailsForm(props: EmployeeDetailsFormProps) {
  const { onChangeDetails, onSubmit, empDetails, onChangeSalary } = props;
  return (
    <form className="emp__detailsForm" onSubmit={onSubmit}>
      <SelectDepartment
        label="Department Name"
        onChange={onChangeDetails}
        value={empDetails.departmentName}
      />
      <SelectCategory
        label="Category Name"
        onChange={onChangeDetails}
        value={empDetails.categoryName}
      />
      <Input
        name="location"
        type="text"
        onChange={onChangeDetails}
        label="Location"
        value={empDetails.location}
      />
      <Input
        name="salary"
        type="text"
        onChange={onChangeSalary}
        label="Salary"
        value={empDetails.salary}
      />
      <div className="emp__detailsFormBtn">
        <Button label="Submit" type="submit" />
      </div>
    </form>
  );
}
