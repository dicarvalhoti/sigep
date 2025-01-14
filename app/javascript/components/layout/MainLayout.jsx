// Layout principal da aplicação
import React, { useState } from 'react';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';

const MainLayout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isVisible={isSidebarVisible} />
      <main className="p-4 md:ml-64 h-auto ">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;