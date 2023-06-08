import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EmployeeTableRow from "./EmployeeTableRow";
import {
  setAddToUpdateEmployees,
  setRemoveFromUpdateEmployees,
} from "./employeeSlice";
import { Employee } from "./interfaces";
export type EmployeeTableBody = {
  employees?: Employee[];
};
export default function EmployeeTableBody(props: EmployeeTableBody) {
  const { employees } = props;
  const appDispatch = useAppDispatch();
  const { updateEmployeesIds } = useAppSelector((state) => state.employees);
  function addToUpdateList(_id: string) {
    appDispatch(setAddToUpdateEmployees(_id));
    console.log(_id);
    
  }
  function removefromUpdateList(_id: string) {
    appDispatch(setRemoveFromUpdateEmployees(_id));
  }
  return (
    <tbody>
      {employees?.map((emp) => (
        <EmployeeTableRow
          employee={emp}
          key={emp._id}
          checked={updateEmployeesIds.some(e=>e===emp._id)}
          addToUpdateList={addToUpdateList}
          removefromUpdateList={removefromUpdateList}
        />
      ))}
    </tbody>
  );
}
