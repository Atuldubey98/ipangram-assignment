import { AiOutlineCloseCircle } from "react-icons/ai";
import Modal from "react-modal";
import { useAppDispatch } from "../../app/hooks";
import EmployeeDetailsForm from "./EmployeeDetailsForm";
import "./EmployeeDetailsUpdateModal.css";
import { updateEmployeeDataAction } from "./employeeSlice";
import { Employee } from "./interfaces";
import useEmployeeDetailsForm from "./useEmployeeDetailsForm";
export type EmployeeDetailsUpdateModal = {
  isOpen: boolean;
  onCloseEmployeeModal: VoidFunction;
  employee: Employee;
};
export type EmployeeCompanyDetails = {
  salary: number;
  departmentName: string;
  categoryName: string;
  location: string;
};
export default function EmployeeDetailsUpdateModal(
  props: EmployeeDetailsUpdateModal
) {
  const { employee, onCloseEmployeeModal } = props;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      margin: "auto",
      width: "720px",
      maxWidth: "100%",
      transform: "translate(-50%, -50%)",
    },
  };
  const { salary, departmentName, categoryName, location } = employee;
  const appDispatch = useAppDispatch();
  const { empDetails, onChangeDetails, onChangeSalary } =
    useEmployeeDetailsForm({
      salary,
      departmentName,
      categoryName,
      location,
    });
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    appDispatch(updateEmployeeDataAction(empDetails, employee._id));
  };
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onCloseEmployeeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="employee__details">
        <h2>
          {employee.firstName} {employee.lastName}
        </h2>
        <AiOutlineCloseCircle
          className="pointer"
          size={30}
          onClick={onCloseEmployeeModal}
        />
      </div>
      <EmployeeDetailsForm
        onSubmit={onSubmit}
        empDetails={empDetails}
        onChangeDetails={onChangeDetails}
        onChangeSalary={onChangeSalary}
      />
    </Modal>
  );
}