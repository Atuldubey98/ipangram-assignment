import Button from "../common/Button";

type EmployeeOperationsProps = {
  updateEmployeesIds: string[];
  generateFilters: () => void;
  openEmployeeDetailModal: VoidFunction;
  onOpenEmployeeCompanyDetailsModal: VoidFunction;
};
export default function EmployeeOperations(props: EmployeeOperationsProps) {
  const {
    updateEmployeesIds,
    generateFilters,
    openEmployeeDetailModal,
    onOpenEmployeeCompanyDetailsModal,
  } = props;
  return (
    <div className="emp__operations">
      <h3>Operations</h3>
      <section className="emp__tableBtns">
        <div className="emp__tableBtn">
          <div className="emp__tableBtn">
            <Button label="Apply Filter" onClick={generateFilters} />
          </div>
        </div>
        {updateEmployeesIds.length > 1 ? (
          <div className="emp__tableBtn">
            <Button
              label="Update Bulk"
              onClick={onOpenEmployeeCompanyDetailsModal}
            />
          </div>
        ) : null}
        {updateEmployeesIds.length === 1 ? (
          <div className="emp__tableBtn">
            <Button
              label="Update Employee Data"
              onClick={openEmployeeDetailModal}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
