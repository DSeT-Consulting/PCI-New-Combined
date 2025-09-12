"use client";

import React, { useState } from "react";
import { Menu, X, Search, ChevronDown, User, LogOut, Bell } from "lucide-react";
import { NAVIGATION_ITEMS } from "../_config/navigation";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  currentPage: string;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPage, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (pageId: string) => {
    router.push(`/admin/${pageId}`);
    setSidebarOpen(false);
  };

  const getCurrentPageTitle = () => {
    const page = NAVIGATION_ITEMS.find((item) => item.id === currentPage);
    return page ? page.name : "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 ${
          sidebarCollapsed ? "w-16" : "w-64"
        } transform bg-white shadow-lg ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col transition-all duration-300 ease-in-out lg:static lg:inset-0 lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div
          className={`flex h-16 flex-shrink-0 items-center border-b border-gray-200 ${
            sidebarCollapsed ? "justify-center px-4" : "justify-between px-6"
          }`}
        >
          <div className="flex items-center">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            {!sidebarCollapsed && (
              <span className="ml-2 truncate text-xl font-bold text-gray-900">
                Paralympic Admin
              </span>
            )}
          </div>
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="flex-shrink-0 text-gray-500 hover:text-gray-700 lg:hidden"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <div key={item.id} className="group relative">
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } ${sidebarCollapsed ? "justify-center" : ""}`}
                  >
                    <Icon
                      size={18}
                      className={`flex-shrink-0 ${!sidebarCollapsed ? "mr-3" : ""}`}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                    {isActive && !sidebarCollapsed && (
                      <div className="absolute bottom-0 right-0 top-0 w-1 rounded-l-full bg-blue-700"></div>
                    )}
                    {isActive && sidebarCollapsed && (
                      <div className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 transform rounded-l-full bg-blue-700"></div>
                    )}
                  </button>

                  {/* Tooltip for collapsed sidebar */}
                  {sidebarCollapsed && (
                    <div className="pointer-events-none invisible absolute left-full top-1/2 z-[60] ml-2 -translate-y-1/2 transform whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      {item.name}
                      <div className="absolute right-full top-1/2 h-0 w-0 -translate-y-1/2 transform border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Collapse Toggle Button - Desktop Only */}
        <div className="hidden flex-shrink-0 border-t border-gray-200 p-3 lg:block">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`flex w-full items-center rounded-lg px-3 py-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu
              size={18}
              className={`flex-shrink-0 ${!sidebarCollapsed ? "mr-3" : ""}`}
            />
            {!sidebarCollapsed && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Top Navigation */}
        <header className="flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex min-w-0 items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-3 flex-shrink-0 text-gray-500 hover:text-gray-700 lg:hidden"
              >
                <Menu size={20} />
              </button>
              <h1 className="truncate text-lg font-semibold text-gray-900 sm:text-xl">
                {getCurrentPageTitle()}
              </h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 lg:w-64"
                />
              </div>

              {/* Mobile Search Button */}
              <button className="p-2 text-gray-500 hover:text-gray-700 sm:hidden">
                <Search size={18} />
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell size={18} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-1 text-gray-500 hover:text-gray-700"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                    <User size={16} />
                  </div>
                  <ChevronDown size={16} className="hidden sm:block" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Preferences
                    </a>
                    <hr className="my-1" />
                    <a
                      href="#"
                      className="block flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
