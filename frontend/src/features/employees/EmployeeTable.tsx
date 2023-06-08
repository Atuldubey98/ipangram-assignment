import { ChangeEventHandler } from "react";
import { useAppDispatch } from "../../app/hooks";
import Input from "../common/Input";
import SelectOptions from "../common/SelectOptions";
import "./EmployeeTable.css";
import EmployeeTableBody from "./EmployeeTableBody";
import SelectCategory from "./SelectCategory";
import SelectDepartment from "./SelectDepartment";
import {
  setAllEmployeesForUpdate,
  setRemoveAllEmployeesForUpdate,
} from "./employeeSlice";
import { Employee, EmployeeQuery } from "./interfaces";
export type EmployeeTableProps = {
  employees?: Employee[];
  employeesQuery: EmployeeQuery;
  totalEmployeesForUpdate: number;
  onChangeFilter: ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
  onChangeSort: ChangeEventHandler<HTMLSelectElement>;
};

export default function EmployeeTable(props: EmployeeTableProps) {
  const { employees, employeesQuery, onChangeFilter, onChangeSort } = props;
  const { filter, sort } = employeesQuery;
  const {
    gender,
    categoryName,
    departmentName,

    firstName,
    lastName,
    location,
  } = filter;

  const orderBy = [
    { value: "", label: "Normal" },
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];
  const genderOptions = [
    {
      value: "",
      label: "All",
    },
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "others",
      label: "Others",
    },
  ];

  const appDispatch = useAppDispatch();

  const onAddAllEmployeeForUpdate: ChangeEventHandler<HTMLInputElement> = (
    _
  ) => {
    if (employees?.length === props.totalEmployeesForUpdate) {
      appDispatch(setRemoveAllEmployeesForUpdate());
    } else {
      appDispatch(
        setAllEmployeesForUpdate((employees || []).map((e) => e._id))
      );
    }
  };
  return (
    <table className="emp__table">
      <thead>
        <tr className="emp__heading">
          <th>Update Department Name</th>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Salary</th>
          <th>Department</th>
          <th>Category Name</th>
          <th>Location</th>
        </tr>
        <tr>
          <th>
            <Input
              type="checkbox"
              onChange={onAddAllEmployeeForUpdate}
              checked={employees?.length === props.totalEmployeesForUpdate}
            />
          </th>
          <th></th>
          <th>
            <Input
              name="firstName"
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={onChangeFilter}
            />
          </th>
          <th>
            <Input
              name="lastName"
              type="text"
              value={lastName}
              onChange={onChangeFilter}
              placeholder="Last Name"
            />
          </th>
          <th>
            <SelectOptions
              onChange={onChangeFilter}
              name="gender"
              options={genderOptions}
              value={gender}
            />
          </th>
          <th></th>
          <th>
            <SelectDepartment
              onChange={onChangeFilter}
              value={departmentName}
            />
          </th>
          <th>
            <SelectCategory onChange={onChangeFilter} value={categoryName} />
          </th>
          <th>
            <Input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={onChangeFilter}
            />
          </th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th>
            <SelectOptions
              onChange={onChangeSort}
              name="firstName"
              options={orderBy}
              value={sort.firstName}
            />
          </th>
          <th>
            <SelectOptions
              onChange={onChangeSort}
              name="lastName"
              options={orderBy}
              value={sort.lastName}
            />
          </th>
          <th></th>
          <th>
            <SelectOptions
              onChange={onChangeSort}
              name="salary"
              options={orderBy}
              value={sort.salary}
            />
          </th>
          <th>
            <SelectOptions
              onChange={onChangeSort}
              name="departmentName"
              options={orderBy}
              value={sort.departmentName}
            />
          </th>
          <th>
            <SelectOptions
              onChange={onChangeSort}
              name="categoryName"
              options={orderBy}
              value={sort.categoryName}
            />
          </th>
          <th>
            <SelectOptions
              onChange={onChangeSort}
              name="location"
              options={orderBy}
              value={sort.location}
            />
          </th>
        </tr>
      </thead>
      {employees?.length !== 0 ? (
        <EmployeeTableBody employees={employees} />
      ) : null}
    </table>
  );
}
