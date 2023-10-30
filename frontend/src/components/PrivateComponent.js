import { Navigate, Outlet } from "react-router-dom";
const PrivateComp = () => {
  const auth = localStorage.getItem("users");

  return auth ? <Outlet /> : <Navigate to="signUp" />;
};

export default PrivateComp;
