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

    setEmpDetails({ ...empDetails, [e.target.name]: e.target.value });
    
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
