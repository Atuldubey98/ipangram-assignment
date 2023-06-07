import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../common/Header";
import "./EmployeePage.css";
import { loadEmployeeAction } from "./employeeSlice";
import ProfileField from "./EmployeeField";
import moment from "moment";
import { BarLoader } from "react-spinners";
export default function ProfilePage() {
  const { employee, employeeStatus } = useAppSelector((state) => state.profile);
  const loading = employeeStatus === "loading";

  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(loadEmployeeAction());
  }, []);
  return (
    <>
      <Header />
      <main className="profile__page">
        <div className="profile__wrapper">
          {loading ? (
            <BarLoader />
          ) : employee ? (
            <>
              <div className="profile__heading">
                <p className="heading">Personal Information</p>
                <span className="profile__updated">
                  Last updated {moment(new Date(employee.updatedAt)).fromNow()}
                </span>
              </div>
              <section className="profile__info">
                <ProfileField heading="Employee ID" value={employee?._id} />
                <ProfileField
                  heading="Full Name"
                  value={
                    (employee?.firstName || "") + (employee.lastName || "")
                  }
                />
                <ProfileField
                  heading="Category Name"
                  value={employee?.categoryName}
                />
                <ProfileField
                  heading="Department Name"
                  value={employee?.departmentName}
                />
                <ProfileField heading="Sex" value={employee?.gender} />
                <ProfileField heading="Location" value={employee?.location} />
                <ProfileField
                  heading="Salary"
                  value={employee?.salary.toFixed(2)}
                />
                <ProfileField
                  heading="Salary"
                  value={employee?.salary.toFixed(2)}
                />
                <ProfileField
                  heading="Joined Company"
                  value={`${moment(
                    new Date(employee.createdAt)
                  ).fromNow()}, ${moment(new Date(employee.createdAt)).format(
                    "MMM Do YY"
                  )}`}
                />
                <ProfileField
                  heading="Hobbies"
                  value={employee.hobbies ? employee.hobbies.join(", ") : ""}
                />
              </section>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
