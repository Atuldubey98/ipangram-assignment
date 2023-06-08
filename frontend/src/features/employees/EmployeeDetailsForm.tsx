import { ChangeEventHandler } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import SelectCategory from "./SelectCategory";
import SelectDepartment from "./SelectDepartment";
import { EmployeeCompanyDetails } from "./EmployeeDetailsUpdateModal";
import SelectOptions from "../common/SelectOptions";
import { useAppSelector } from "../../app/hooks";
import { BarLoader } from "react-spinners";
export type EmployeeDetailsFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChangeDetails: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onChangeSalary: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  empDetails: EmployeeCompanyDetails;
};
export default function EmployeeDetailsForm(props: EmployeeDetailsFormProps) {
  const { onChangeDetails, onSubmit, empDetails, onChangeSalary } = props;
  const { udpateEmployeeDetailsStatus } = useAppSelector(
    (state) => state.employees
  );
  const loading = udpateEmployeeDetailsStatus === "loading";
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
      {empDetails.role ? (
        <SelectOptions
          label="Role"
          options={[
            { value: "manager", label: "Manager" },
            { value: "employee", label: "Employee" },
          ]}
          onChange={onChangeDetails}
          name="role"
          value={empDetails.role}
        />
      ) : null}
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
        {loading ? <BarLoader /> : <Button label="Submit" type="submit" />}
      </div>
    </form>
  );
}
