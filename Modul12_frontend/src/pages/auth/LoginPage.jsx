import { Container } from "react-bootstrap";
import FormLogin from "../../components/forms/FormLogin";
import imgAH from "../../assets/images/atmahub-white.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromSession = sessionStorage.getItem("token");
    setToken(tokenFromSession);
    if (tokenFromSession) {
      navigate("/user");
    }
  }, [navigate]);

  return (
    !token && (
      <Container className="mt-5">
        <div className="text-center mb-3">
          <img src={imgAH} width="200" alt="Logo AtmaHub" />
          <h1 className="mt-1 pb-1 fw-bold" style={{ color: "#fafaff" }}>
            Sign In
          </h1>
        </div>
        <FormLogin />
      </Container>
    )
  );
};

export default LoginPage;
