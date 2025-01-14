import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../../features/auth/authThunks';
import { clearAuth } from "../../features/auth/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      await dispatch(logout());
     clearAuth();
      navigate("/app/login"); // Redireciona para a página de login
    };

    performLogout();
  }, [dispatch, navigate]);

  return null; // Nenhum conteúdo é exibido
};

export default Logout;