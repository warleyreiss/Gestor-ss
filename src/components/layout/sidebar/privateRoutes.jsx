import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

//em uso
export const PrivateRoute = () => {
  
    const { signed } = useContext(AuthContext)
    console.log('na pagina privateRoute signed é:'+signed)
    return signed ? <Outlet/>:<Navigate to='/login'/>;
    //return signed ? <Navigate to="/home" />: <Navigate to="/login" />;
  
  };
