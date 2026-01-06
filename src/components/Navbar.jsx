import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Hammer, Menu, X } from "lucide-react";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
      console.error("Failed to log out");
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
          >
            <Hammer className="h-8 w-8 text-blue-600 transform rotate-12" />
            <span className="font-bold text-xl tracking-tight text-slate-800">
              Tool Trust
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/tools"
              className="text-slate-600 hover:text-blue-600 font-medium"
            >
              Browse Tools
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-slate-600 hover:text-blue-600 font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-tool"
                  className="text-slate-600 hover:text-blue-600 font-medium"
                >
                  List a Tool
                </Link>

                <div className="flex items-center pl-4 border-l border-slate-200 ml-4 space-x-4">
                  <span className="text-sm text-slate-500 truncate max-w-[150px]">
                    {currentUser.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-slate-500 hover:text-red-600"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-blue-600 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-50 border-t border-slate-200">
          <div className="px-4 py-3 space-y-3 pb-6">
            <Link
              to="/tools"
              onClick={() => setIsOpen(false)}
              className="block text-slate-600 hover:text-blue-600 font-medium py-2"
            >
              Browse Tools
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-600 hover:text-blue-600 font-medium py-2"
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-tool"
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-600 hover:text-blue-600 font-medium py-2"
                >
                  List a Tool
                </Link>

                <div className="pt-4 mt-2 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-3">
                    {currentUser.email}
                  </p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-slate-600 hover:text-blue-600 font-medium py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-blue-600 text-white py-3 rounded-lg font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
