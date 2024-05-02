import { Outlet, Navigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";

const ProtectedRoutes = () => {
  const { user } = useContext(GlobalContext);

  return <>{!user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
