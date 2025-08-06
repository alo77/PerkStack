import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiUser, FiLogOut, FiAward, FiBarChart3 } = FiIcons;

const Header = () => {
  const { user, logout, isBusiness } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navItems = user ? (
    isBusiness ? [
      { label: 'Dashboard', path: '/business', icon: FiBarChart3 },
    ] : [
      { label: 'My Rewards', path: '/rewards', icon: FiAward },
    ]
  ) : [];

  return (
    <header className="bg-gray-850 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#9966cb] to-[#43D0B9] rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiAward} className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-white">PerkStack</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 text-gray-400 hover:text-[#9966cb] transition-colors"
              >
                <SafeIcon icon={item.icon} className="text-sm" />
                <span>{item.label}</span>
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiUser} className="text-gray-400" />
                  <span className="text-sm text-gray-300">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <SafeIcon icon={FiLogOut} className="text-sm" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-[#9966cb] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-750"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="text-xl" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-700"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-[#9966cb] transition-colors"
                >
                  <SafeIcon icon={item.icon} className="text-sm" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {user ? (
                <>
                  <div className="flex items-center space-x-2 pt-2 border-t border-gray-700">
                    <SafeIcon icon={FiUser} className="text-gray-400" />
                    <span className="text-sm text-gray-300">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <SafeIcon icon={FiLogOut} className="text-sm" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#9966cb] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-center"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;