import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { HiHome,HiShoppingBag, HiUser, } from "react-icons/hi";
import { ROUTES } from '../../config/constants';

const SidebarComponent = ({ isVisible, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div className={`fixed left-0 z-40 w-64 h-screen transition-transform ${
      isVisible ? 'translate-x-0' : '-translate-x-full'
    } bg-gray-gray-50 border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} >
      <div className="overflow-y-auto h-full bg-gray-50 dark:bg-gray-800">
        <Sidebar aria-label="Sidebar"
        collapsed={false}>
        <div className="flex h-full flex-col justify-between py-2">
          <Sidebar.Items className="bg-red" >
            <Sidebar.ItemGroup>
              <Sidebar.Item
                as={Link}
                to= {ROUTES.HOME}
                icon={HiHome}
                active={location.pathname === ROUTES.HOME}
                className="hover:bg-gray-200"
              >
                Dashboard
              </Sidebar.Item>
     
              <Sidebar.Item
                as={Link}
                to= {ROUTES.USERS}
                icon={HiUser}
                active={location.pathname === ROUTES.USERS}
                className="hover:bg-gray-200"
              >
                Usuários
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to={ROUTES.PAYMENTS}
                icon={HiShoppingBag}
                active={location.pathname === ROUTES.PAYMENTS}
                className="hover:bg-gray-200"
              >
                Pagamentos
              </Sidebar.Item>
   
            </Sidebar.ItemGroup>
          </Sidebar.Items>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default SidebarComponent;