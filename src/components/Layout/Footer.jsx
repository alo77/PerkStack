import React from 'react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAward } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-850 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-br from-[#9966cb] to-[#43D0B9] rounded flex items-center justify-center">
              <SafeIcon icon={FiAward} className="text-white text-sm" />
            </div>
            <span className="text-lg font-semibold">PerkStack</span>
          </div>
          <div className="text-sm text-gray-400 text-center md:text-right">
            <p>&copy; 2024 PerkStack. All rights reserved.</p>
            <p className="mt-1">Building better customer relationships through rewards.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;