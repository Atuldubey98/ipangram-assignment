import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../common/Header";
import "./ProfilePage.css";
import { loadProfileAction } from "./profileSlice";
import ProfileField from "./ProfileField";
import moment from "moment";
import { BarLoader } from "react-spinners";
export default function ProfilePage() {
  const { profile, profileStatus } = useAppSelector((state) => state.profile);
  const loading = profileStatus === "loading";

  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(loadProfileAction());
  }, []);
  return (
    <>
      <Header />
      <main className="profile__page">
        <div className="profile__wrapper">
          {loading ? (
            <BarLoader />
          ) : profile ? (
            <>
              <div className="profile__heading">
                <p className="heading">Personal Information</p>
                <span className="profile__updated">
                  Last updated {moment(new Date(profile.updatedAt)).fromNow()}
                </span>
              </div>
              <section className="profile__info">
                <ProfileField heading="Employee ID" value={profile?._id} />
                <ProfileField
                  heading="Full Name"
                  value={(profile?.firstName || "") + (profile.lastName || "")}
                />
                <ProfileField
                  heading="Category Name"
                  value={profile?.categoryName}
                />
                <ProfileField
                  heading="Department Name"
                  value={profile?.departmentName}
                />
                <ProfileField heading="Sex" value={profile?.gender} />
                <ProfileField heading="Location" value={profile?.location} />
                <ProfileField
                  heading="Salary"
                  value={profile?.salary.toFixed(2)}
                />
                <ProfileField
                  heading="Salary"
                  value={profile?.salary.toFixed(2)}
                />
                <ProfileField
                  heading="Joined Company"
                  value={`${moment(
                    new Date(profile.createdAt)
                  ).fromNow()}, ${moment(new Date(profile.createdAt)).format(
                    "MMM Do YY"
                  )}`}
                />
                <ProfileField
                  heading="Hobbies"
                  value={profile.hobbies ? profile.hobbies.join(", ") : ""}
                />
              </section>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
