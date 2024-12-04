import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { cn } from '../lib/utils';
import { 
  Home, 
  Users, 
  Shield, 
  UserCircle, 
  LogOut,
  Moon,
  Sun
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { to: '/', label: 'Home', icon: Home, show: true },
    { to: '/profile', label: 'Profile', icon: UserCircle, show: true },
    { to: '/users', label: 'Manage Users', icon: Users, show: user?.role === 'admin' },
    { to: '/roles', label: 'Roles & Permissions', icon: Shield, show: user?.role === 'admin' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
              RBAC UI
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map(({ to, label, icon: Icon, show }) => 
                show && (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                      location.pathname === to
                        ? "bg-gray-900 text-white dark:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-700 hover:text-white dark:text-gray-300"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-700 hover:text-white dark:text-gray-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}