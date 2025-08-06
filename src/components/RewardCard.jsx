import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiGift } = FiIcons;

const RewardCard = ({ reward, businessName, userPoints, onRedeem, darkMode = false }) => {
  const canRedeem = userPoints >= reward.pointsRequired;
  
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-100';
  const categoryBg = darkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90';
  const disabledBg = darkMode ? 'bg-gray-700' : 'bg-gray-100';
  const disabledText = darkMode ? 'text-gray-500' : 'text-gray-400';
  
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`${bgColor} rounded-2xl overflow-hidden shadow-md border ${borderColor}`}
    >
      <div className="relative">
        <img 
          src={reward.image} 
          alt={reward.title}
          className="w-full h-32 object-cover"
        />
        <div className={`absolute top-2 right-2 ${categoryBg} rounded-full px-2 py-1 text-xs font-medium`}>
          {reward.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <SafeIcon 
            icon={FiGift} 
            className="text-[#9966cb] mr-2"
          />
          <p className={`text-sm ${textSecondary}`}>{businessName}</p>
        </div>
        
        <h3 className={`font-bold ${textColor} mb-2`}>{reward.title}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <SafeIcon icon={FiStar} className="text-[#43D0B9] mr-1" />
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {reward.pointsRequired} points
            </span>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => canRedeem && onRedeem(reward)}
            disabled={!canRedeem}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              canRedeem 
                ? 'bg-[#9966cb] text-white' 
                : `${disabledBg} ${disabledText}`
            }`}
          >
            {canRedeem ? 'Redeem' : 'Not Enough'}
          </motion.button>
        </div>
        
        {!canRedeem && (
          <div className={`mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Need {reward.pointsRequired - userPoints} more points
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RewardCard;