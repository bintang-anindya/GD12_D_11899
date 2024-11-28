import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    setToken(tokenDariSS);
    if (!tokenDariSS) {
      navigate("/");
    }
  }, [navigate]);

  return token && (children || <Outlet />);
};

export default ProtectedRoutes;
