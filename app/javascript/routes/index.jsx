import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import Login from '../components/auth/Login';
import UserList from '../components/users/UserList';
import Dashboard from '../components/Dashboard';
import Logout from '../components/auth/Logout';
import PaymentAdd from '../components/payments/PaymentAdd';
import PaymentList from '../components/payments/PaymentList';
import { ROUTES } from '../config/constants';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota pública: Login */}
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* Rotas protegidas */}
      <Route
        path="/*"
        element={
          <ProtectedRoute fallback={<p>Carregando informações...</p>}>
            <MainLayout>
              <Routes>
                <Route path={ROUTES.HOME} element={<Dashboard />} />
                <Route path={ROUTES.USERS} element={<UserList />} />
                <Route path={ROUTES.ADD_PAYMENT} element={<PaymentAdd />} />
                <Route path={ROUTES.PAYMENTS} element={<PaymentList />} />
                <Route path={ROUTES.LOGOUT} element={<Logout />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const Layout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Carregando...</div>} persistor={persistor}>
        <Router future={{ v7_startTransition: true }}>
          <AppRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
