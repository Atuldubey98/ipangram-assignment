import { Employee, EmployeeQuery } from "./interfaces";
import "./EmployeeTable.css";
import Input from "../common/Input";
import SelectOptions from "../common/SelectOptions";
import { ChangeEventHandler } from "react";
import EmployeeTableBody from "./EmployeeTableBody";
import { useAppDispatch } from "../../app/hooks";
import {
  setAllEmployeesForUpdate,
  setRemoveAllEmployeesForUpdate,
} from "./employeeSlice";
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

  const departMentNames = [
    { value: "", label: "All" },
    { value: "google", label: "Google" },
    { value: "ipangram", label: "Ipangram" },
    { value: "facebook", label: "Facebook" },
    { value: "wipro", label: "Wipro" },
    { value: "wallmart", label: "Wallmart" },
    { value: "NA", label: "NA" },
  ];
  const appDispatch = useAppDispatch();
  const categoryNames = [
    { value: "", label: "All" },
    { value: "HR", label: "HR" },
    { value: "IT", label: "IT" },
    { value: "sales", label: "Sales" },
    { value: "product", label: "Product" },
    { value: "marketting", label: "Marketting" },
    { value: "NA", label: "NA" },
  ];
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
  return employees?.length != 0 ? (
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
            <SelectOptions
              onChange={onChangeFilter}
              name="departmentName"
              options={departMentNames}
              value={departmentName}
            />
          </th>
          <th>
            <SelectOptions
              onChange={onChangeFilter}
              name="categoryName"
              options={categoryNames}
              value={categoryName}
            />
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
      <EmployeeTableBody employees={employees} />
    </table>
  ) : null;
}
