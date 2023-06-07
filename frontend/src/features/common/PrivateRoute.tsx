import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { loadUserAction } from "../login/loginSlice";

interface PrivateRouteProps {
  children: React.ReactNode;
}
export default function PrivateRoute({
  children,
}: PrivateRouteProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);

  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(loadUserAction());
    setLoading(false);
  }, []);
  return loading ? <></> : <>{children}</>;
}
