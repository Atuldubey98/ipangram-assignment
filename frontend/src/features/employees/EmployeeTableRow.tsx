import { ChangeEventHandler } from "react";
import Input from "../common/Input";
import { Employee } from "./interfaces";

type EmployeeTableRowProps = {
  employee: Employee;
  removefromUpdateList: (_id: string) => void;
  addToUpdateList: (_id: string) => void;
  checked: boolean;
};
export default function EmployeeTableRow(props: EmployeeTableRowProps) {
  const { employee, addToUpdateList, removefromUpdateList } = props;
  const onChangeUpdate: ChangeEventHandler<HTMLInputElement> = (_) => {
    if (props.checked) {
      removefromUpdateList(employee._id);
    } else {
      addToUpdateList(employee._id);
    }
  };
  
  return (
    <tr>
      <td>
        <Input
          type="checkbox"
          name="select"
          onChange={onChangeUpdate}
          checked={props.checked}
        />
      </td>
      <td>{employee._id}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.gender}</td>
      <td>{employee.salary}</td>
      <td>{employee.departmentName}</td>
      <td>{employee.categoryName}</td>
      <td>{employee.location}</td>
    </tr>
  );
}
