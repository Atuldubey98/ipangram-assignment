import { ChangeEventHandler, useState } from "react";
import { EmployeeCompanyDetails } from "./EmployeeDetailsUpdateModal";

export default function useEmployeeDetailsForm(
  defaultEmpDetails: EmployeeCompanyDetails
) {
  const [empDetails, setEmpDetails] =
    useState<EmployeeCompanyDetails>(defaultEmpDetails);
  const onChangeDetails: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (e) => {
    console.log(e.target.value);

    setEmpDetails({ ...empDetails, [e.target.name]: e.target.value });
    console.log(e.target.name);
    
  };
  const onChangeSalary: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    setEmpDetails({ ...empDetails, salary: Number(e.target.value) });
  };
  return {
    empDetails,
    onChangeDetails,
    onChangeSalary,
  };
}
