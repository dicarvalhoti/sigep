import React from "react";
import { Navbar } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link, useLocation  } from "react-router-dom";
import { HiMenuAlt1 } from 'react-icons/hi';
import { ROUTES } from '../../config/constants';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authThunks';

const NavbarComponent = ({ toggleSidebar }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (err) {
      console.error('Erro no logout:', err);
    }
  };
  return (
    <Navbar fluid rounded className="shadow-md bg-gray-50 border-b-2">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <HiMenuAlt1 className="w-6 h-6" />
          <span className="sr-only">Toggle sidebar</span>
        </button>
        <Navbar.Brand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Meu Site
          </span>
        </Navbar.Brand>
      </div>
      
      <Navbar.Toggle />
      
      <Navbar.Collapse className="ml-auto">
       <span className="self-center whitespace-nowrap text-sm font-thin dark:text-white">
          {currentUser.email} 
        </span>
        <Navbar.Link as={Link} to="/" active={location.pathname === "/"}>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="#">
          Sobre
        </Navbar.Link>

        <Navbar.Link as={Link} to={ROUTES.LOGOUT} onClick={() => handleLogout()}>
          Sair
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;