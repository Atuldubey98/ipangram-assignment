import { useAppSelector } from "../../app/hooks";

export type ManagerContainerProps = {
  children?: React.ReactNode;
};
export default function ManagerContainer({ children }: ManagerContainerProps) {
  const { user } = useAppSelector((state) => state.auth);
  const managerRole = user?.role === "manager";
  return managerRole ? <>{children}</> : null;
}
