import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useData } from '../contexts/DataContext';

const { FiX, FiCamera, FiCheck } = FiIcons;

const ScanModal = ({ onClose, darkMode = false }) => {
  const [scanning, setScanning] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [business, setBusiness] = useState(null);
  const [points, setPoints] = useState(0);
  const { businesses, addPoints } = useData();
  
  // Theme variables
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-100';
  const buttonBgColor = darkMode ? 'bg-gray-700' : 'bg-gray-100';
  const scannerBg = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const scannerIconColor = darkMode ? 'text-gray-600' : 'text-gray-400';
  const resultCardBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';
  
  // Simulate scanning process
  useEffect(() => {
    if (scanning) {
      const scanTimer = setTimeout(() => {
        setScanning(false);
        setScanned(true);
        
        // Pick a random business and points
        const randomBusiness = businesses[Math.floor(Math.random() * businesses.length)];
        const earnedPoints = Math.floor(Math.random() * 30) + 10; // Random between 10-40
        
        setBusiness(randomBusiness);
        setPoints(earnedPoints);
        
        // Add points to the user's account
        addPoints(randomBusiness.id, earnedPoints);
      }, 2000);
      
      return () => clearTimeout(scanTimer);
    }
  }, [scanning, businesses, addPoints]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${bgColor} rounded-2xl w-full max-w-sm mx-4 overflow-hidden ${darkMode ? 'border border-gray-700' : ''}`}
      >
        <div className="relative">
          {/* Header */}
          <div className={`p-4 border-b ${borderColor} flex justify-between items-center`}>
            <h3 className={`font-bold text-lg ${textColor}`}>
              {scanning ? 'Scan QR Code' : 'Scan Complete'}
            </h3>
            <button 
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${buttonBgColor}`}
            >
              <SafeIcon icon={FiX} className={darkMode ? 'text-gray-300' : ''} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {scanning ? (
              <>
                <div className={`w-full aspect-square ${scannerBg} rounded-lg mb-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <SafeIcon icon={FiCamera} className={`text-4xl ${scannerIconColor}`} />
                  </div>
                  
                  {/* Scanning animation */}
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: ['0%', '100%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute left-0 right-0 h-1 bg-[#43D0B9] opacity-70"
                  />
                  
                  {/* Corner markers */}
                  <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#9966cb]"></div>
                  <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#9966cb]"></div>
                  <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#9966cb]"></div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#9966cb]"></div>
                </div>
                <p className={`text-center ${textSecondary}`}>
                  Position the QR code within the frame to scan
                </p>
              </>
            ) : (
              <>
                {scanned && business && (
                  <div className="text-center">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 mx-auto bg-[#43D0B9] rounded-full flex items-center justify-center mb-4"
                    >
                      <SafeIcon icon={FiCheck} className="text-white text-4xl" />
                    </motion.div>
                    
                    <h4 className={`font-bold text-xl ${textColor} mb-1`}>
                      Points Added!
                    </h4>
                    
                    <p className={`${textSecondary} mb-4`}>
                      You earned points from {business.name}
                    </p>
                    
                    <div className={`${resultCardBg} rounded-xl p-4 mb-4`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={business.logo} 
                            alt={business.name} 
                            className="w-10 h-10 rounded-lg mr-3" 
                          />
                          <div>
                            <p className={`font-medium ${textColor}`}>{business.name}</p>
                            <p className="text-xs text-gray-500">{business.category}</p>
                          </div>
                        </div>
                        
                        <div className="text-[#9966cb] font-bold text-xl">
                          +{points}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#9966cb] text-white rounded-xl font-medium"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScanModal;