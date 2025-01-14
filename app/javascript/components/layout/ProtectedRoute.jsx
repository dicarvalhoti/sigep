import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react';

const ProtectedRoute = ({ children, fallback = null }) => {
  const { currentUser, loading } = useSelector((state) => state.auth); // Supondo que o slice de autenticação se chama 'auth'
  const location = useLocation();

  if (loading) {
    return (
      fallback || (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" />
        </div>
      )
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;