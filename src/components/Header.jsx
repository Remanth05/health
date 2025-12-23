import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Menu, X, Pill, User as UserIcon } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold gradient-primary text-transparent bg-clip-text"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg"></div>
          HMS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
            Home
          </Link>
          {isAuthenticated && (
            <>
              {user?.role === "admin" && (
                <Link to="/admin" className="text-gray-700 hover:text-gray-900 font-medium">
                  Dashboard
                </Link>
              )}
              {user?.role === "doctor" && (
                <Link to="/doctor" className="text-gray-700 hover:text-gray-900 font-medium">
                  Dashboard
                </Link>
              )}
              {user?.role === "patient" && (
                <>
                  <Link to="/patient" className="text-gray-700 hover:text-gray-900 font-medium">
                    Dashboard
                  </Link>
                  <Link to="/medicines" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium">
                    <Pill className="h-4 w-4" />
                    <span>Medicines</span>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 font-medium transition-all"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-4">
            <Link to="/" className="block text-gray-700 hover:text-gray-900 font-medium">
              Home
            </Link>
            {isAuthenticated && (
              <>
                {user?.role === "admin" && (
                  <Link to="/admin" className="block text-gray-700 hover:text-gray-900 font-medium">
                    Dashboard
                  </Link>
                )}
                {user?.role === "doctor" && (
                  <Link
                    to="/doctor"
                    className="block text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                {user?.role === "patient" && (
                  <Link
                    to="/patient"
                    className="block text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
