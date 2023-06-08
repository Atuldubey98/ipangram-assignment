import Button from "../common/Button";

type EmployeeOperationsProps = {
  updateEmployeesIds: string[];
  generateFilters: () => void;
};
export default function EmployeeOperations(props: EmployeeOperationsProps) {
  const { updateEmployeesIds, generateFilters } = props;
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
            <Button label="Update Bulk" />
          </div>
        ) : null}
        {updateEmployeesIds.length === 1 ? (
          <div className="emp__tableBtn">
            <Button label="Update Employee Data" />
          </div>
        ) : null}
      </section>
    </div>
  );
}
