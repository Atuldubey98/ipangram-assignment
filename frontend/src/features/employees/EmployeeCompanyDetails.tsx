import { FormEventHandler } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Modal from "react-modal";
import EmployeeDetailsForm from "./EmployeeDetailsForm";
import useEmployeeDetailsForm from "./useEmployeeDetailsForm";
import { useAppDispatch } from "../../app/hooks";
import { updateEmployeeCompanyDetailsAction } from "./employeeSlice";

export type EmployeeCompanyDetailsProps = {
  isOpen: boolean;
  onCloseEmployeeCompanyDetailsModal: VoidFunction;
  updateEmployeesIds: string[];
};
export default function EmployeeCompanyDetails(
  props: EmployeeCompanyDetailsProps
) {
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
  const appDispatch = useAppDispatch();
  const { empDetails, onChangeDetails, onChangeSalary } =
    useEmployeeDetailsForm({
      salary: 0,
      departmentName: "",
      categoryName: "",
      location: "",
    });
  const { isOpen, onCloseEmployeeCompanyDetailsModal } = props;
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    appDispatch(
      updateEmployeeCompanyDetailsAction(empDetails, props.updateEmployeesIds)
    );
  };
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onCloseEmployeeCompanyDetailsModal}
    >
      <div className="employee__details">
        <h2>Employees Company Details Bulk Update</h2>
        <AiOutlineCloseCircle
          className="pointer"
          size={30}
          onClick={onCloseEmployeeCompanyDetailsModal}
        />
      </div>
      <EmployeeDetailsForm
        empDetails={empDetails}
        onSubmit={onSubmit}
        onChangeDetails={onChangeDetails}
        onChangeSalary={onChangeSalary}
      />
    </Modal>
  );
}
