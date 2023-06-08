import { GrNext, GrPrevious } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../common/Header";
import ManagerContainer from "../common/ManagerContainer";
import SelectOptions from "../common/SelectOptions";
import {
  setEmpCompanyDetailsModalClose,
  setEmpCompanyDetailsModalOpen,
  setEmployeeDetailsModalClose,
  setEmployeeDetailsModalOpen,
} from "../ui/uiSlice";
import EmployeeDetailsUpdateModal from "./EmployeeDetailsUpdateModal";
import EmployeeOperations from "./EmployeeOperations";
import EmployeeTable from "./EmployeeTable";
import "./EmployeesPage.css";
import useEmployeesTable from "./useEmployeesTable";
import EmployeeCompanyDetails from "./EmployeeCompanyDetails";
export default function EmployeesPage() {
  const {
    employeesResponse,
    employeesQuery,
    onChangeFilter,
    onChangeSort,
    onLimitChange,
    generateFilters,
    onPageChange,
    updateEmployeesIds,
    query,
  } = useEmployeesTable();
  const employees =
    employeesResponse && employeesResponse.docs ? employeesResponse.docs : [];
  const { employeeDetailsModal, employeeCompanyDetails } = useAppSelector(
    (state) => state.ui
  );
  const appDispatch = useAppDispatch();
  const openEmployeeDetailModal = () => {
    if (updateEmployeesIds.length === 1) {
      appDispatch(
        setEmployeeDetailsModalOpen(
          employees.filter((emp) => emp._id === updateEmployeesIds[0])[0]
        )
      );
    }
  };
  const onCloseEmployeeModal = () => {
    appDispatch(setEmployeeDetailsModalClose());
  };
  const onOpenEmployeeCompanyDetailsModal = () => {
    appDispatch(setEmpCompanyDetailsModalOpen());
  };
  const onCloseEmployeeCompanyDetailsModal = () => {
    appDispatch(setEmpCompanyDetailsModalClose());
  };
  return (
    <ManagerContainer>
      <main>
        <Header />
        <EmployeeOperations
          onOpenEmployeeCompanyDetailsModal={onOpenEmployeeCompanyDetailsModal}
          openEmployeeDetailModal={openEmployeeDetailModal}
          updateEmployeesIds={updateEmployeesIds}
          generateFilters={generateFilters}
        />
        <section className="emp__tableWrapper">
          <EmployeeTable
            totalEmployeesForUpdate={updateEmployeesIds.length || 0}
            onChangeSort={onChangeSort}
            employees={employees}
            onChangeFilter={onChangeFilter}
            employeesQuery={employeesQuery}
          />
        </section>
        <div className="emp__tableFooter">
          {employeesResponse?.hasPrevPage ? (
            <GrPrevious
              onClick={() => onPageChange(false)}
              className="pointer"
            />
          ) : null}
          <SelectOptions
            options={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
            ]}
            onChange={onLimitChange}
            value={query.limit}
          />
          {employeesResponse?.hasNextPage ? (
            <GrNext onClick={() => onPageChange(true)} className="pointer" />
          ) : null}
        </div>
        <p className="emp__stats">
          {employeesResponse?.page} of {employeesResponse?.totalPages}
          {" Pages"} {", Total Employees :" + employeesResponse?.totalDocs || 0}
        </p>
      </main>
      {employeeDetailsModal.employee && employeeDetailsModal.isOpen ? (
        <EmployeeDetailsUpdateModal
          employee={employeeDetailsModal.employee}
          onCloseEmployeeModal={onCloseEmployeeModal}
          isOpen={employeeDetailsModal.isOpen}
        />
      ) : null}
      <EmployeeCompanyDetails
        updateEmployeesIds={updateEmployeesIds}
        onCloseEmployeeCompanyDetailsModal={onCloseEmployeeCompanyDetailsModal}
        isOpen={employeeCompanyDetails.isOpen}
      />
    </ManagerContainer>
  );
}
