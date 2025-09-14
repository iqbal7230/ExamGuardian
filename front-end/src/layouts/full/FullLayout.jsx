import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../full/header/Header.jsx";
import Sidebar from "../full/sidebar/Sidebar.jsx";

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />

      {/* PageWrapper */}
      <div className="flex flex-col flex-1 pb-16 z-10 bg-transparent">
        {/* Header */}
        <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* PageContent */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] w-full mx-auto pt-5">
          <div className="min-h-[calc(100vh-170px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullLayout;
