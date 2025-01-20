import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

//em uso
export const PrivateRoute = () => {
  
    const { signed } = useContext(AuthContext)
    return signed ? <Outlet/>:<Outlet/>;
    //return signed ? <Navigate to="/home" />: <Navigate to="/login" />;
  
  };
