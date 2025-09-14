import { useState } from "react";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";

const Sidebar = ({ isSidebarOpen, isMobileSidebarOpen, onSidebarClose }) => {
  const sidebarWidth = "w-[270px]";

  return (
    <>
      {/* ---------------- Desktop Sidebar ---------------- */}
      <div
        className={`hidden md:flex flex-col h-screen bg-white border-r border-gray-200 ${sidebarWidth} flex-shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center px-4 py-3 gap-2">

          <Logo />
      
        </div>

        {/* Sidebar Items */}
        <div className="flex-1 overflow-y-auto">
          <SidebarItems />
        </div>
      </div>

      {/* ---------------- Mobile Sidebar ---------------- */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onSidebarClose}
          ></div>

          {/* Sidebar Panel */}
          <div
            className={`relative bg-white ${sidebarWidth} h-full flex flex-col`}
          >
            {/* Close button */}
            <button
              onClick={onSidebarClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="flex items-center px-4 py-3 gap-2">
              <Logo />
            
            </div>

            {/* Sidebar Items */}
            <div className="flex-1 overflow-y-auto">
              <SidebarItems />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
