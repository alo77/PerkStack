import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiGift, FiCamera, FiTag, FiUser } = FiIcons;

const BottomNavigation = ({ darkMode = false }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/rewards', icon: FiGift, label: 'Rewards' },
    { path: '/scan', icon: FiCamera, label: 'Scan', isMain: true },
    { path: '/offers', icon: FiTag, label: 'Offers' },
    { path: '/account', icon: FiUser, label: 'Account' },
  ];

  const bgColor = darkMode ? 'bg-gray-850' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const textInactive = darkMode ? 'text-gray-500' : 'text-gray-500';
  const textActive = 'text-[#9966cb]';

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${bgColor} border-t ${borderColor} z-40`}>
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          if (item.isMain) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative -mt-5 flex flex-col items-center"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-[#9966cb] to-[#43D0B9] flex items-center justify-center shadow-lg"
                >
                  <SafeIcon icon={item.icon} className="text-white text-xl" />
                </motion.div>
                <span className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </Link>
            );
          }
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="py-3 px-4 flex flex-col items-center"
            >
              <div className={`mb-1 ${isActive ? textActive : textInactive}`}>
                <SafeIcon icon={item.icon} className="text-xl" />
              </div>
              <span className={`text-xs ${isActive ? textActive + ' font-medium' : textInactive}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="navigation-underline"
                  className="absolute bottom-0 w-10 h-0.5 bg-[#9966cb]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;