import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import BottomNavigation from '../components/BottomNavigation';
import RewardCard from '../components/RewardCard';
import ScanModal from '../components/ScanModal';

const { 
  FiStar, FiGift, FiCheck, FiFilter, FiChevronLeft, 
  FiChevronRight, FiClock, FiCamera, FiUser 
} = FiIcons;

const UserRewards = () => {
  const { user } = useAuth();
  const { businesses, rewards, getUserPoints, redeemReward, transactions } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstName, setFirstName] = useState('');

  const categories = ['all', 'Beverage', 'Discount', 'Service', 'Food'];

  const filteredRewards = rewards.filter(reward => 
    selectedCategory === 'all' || reward.category === selectedCategory
  );

  useEffect(() => {
    // Extract first name from user's full name
    if (user?.name) {
      const nameParts = user.name.split(' ');
      setFirstName(nameParts[0]);
    }
  }, [user]);

  const handleRedeemClick = (reward) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const handleConfirmRedeem = () => {
    if (selectedReward) {
      const success = redeemReward(selectedReward.id);
      if (success) {
        setShowRedeemModal(false);
        setSelectedReward(null);
      }
    }
  };

  const getBusinessName = (businessId) => {
    const business = businesses.find(b => b.id === businessId);
    return business ? business.name : 'Unknown Business';
  };

  const totalPoints = businesses.reduce((total, business) => {
    return total + getUserPoints(business.id);
  }, 0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === filteredRewards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? filteredRewards.length - 1 : prevIndex - 1
    );
  };

  const handleScanClick = () => {
    setShowScanModal(true);
  };

  // Target points for progress bar visualization
  const targetPoints = 500;
  const progressPercentage = Math.min((totalPoints / targetPoints) * 100, 100);
  
  // Get the nearest reward target
  const getNextRewardTarget = () => {
    const sortedRewards = [...rewards].sort((a, b) => a.pointsRequired - b.pointsRequired);
    const nextReward = sortedRewards.find(reward => reward.pointsRequired > totalPoints);
    return nextReward ? nextReward.pointsRequired : targetPoints;
  };

  const nextTarget = getNextRewardTarget();
  const pointsToNext = nextTarget - totalPoints;

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-900 pb-16 text-gray-300">
      {/* Header with greeting */}
      <div className="bg-gray-800 text-white pt-8 pb-10 px-4 rounded-b-3xl shadow-md">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Hi {firstName || 'there'}! 👋</h1>
          <p className="text-gray-400 text-sm mb-6">Welcome to your PerkStack rewards</p>
          
          {/* Points balance card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gray-850 rounded-2xl p-5 shadow-lg border border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[#9966cb] font-bold text-lg">Your Points</h2>
              <span className="text-sm text-gray-400">Target: {targetPoints}</span>
            </div>
            
            <div className="text-3xl font-bold text-white mb-2 flex items-baseline">
              {totalPoints}
              <span className="text-gray-500 text-base font-normal ml-1">/{nextTarget}</span>
            </div>
            
            {/* Progress bar */}
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#9966cb] to-[#43D0B9] rounded-full"
              />
            </div>
            
            {pointsToNext > 0 ? (
              <p className="text-sm text-gray-400">
                {pointsToNext} more points until your next reward!
              </p>
            ) : (
              <p className="text-sm text-[#43D0B9] font-medium">
                You can redeem rewards now!
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-md mx-auto px-4 mt-6">
        {/* Categories filter */}
        <div className="mb-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-[#9966cb] text-white'
                    : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600'
                }`}
              >
                {category === 'all' ? 'All Rewards' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Available Rewards Heading */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Available Rewards</h2>
          <div className="flex space-x-1">
            <button 
              onClick={prevSlide}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-750"
            >
              <SafeIcon icon={FiChevronLeft} className="text-gray-300" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-750"
            >
              <SafeIcon icon={FiChevronRight} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Rewards Carousel */}
        <div className="mb-8 relative overflow-hidden">
          <div className="relative h-[220px]">
            {filteredRewards.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full"
                >
                  <RewardCard 
                    reward={filteredRewards[activeIndex]} 
                    businessName={getBusinessName(filteredRewards[activeIndex].businessId)}
                    userPoints={getUserPoints(filteredRewards[activeIndex].businessId)}
                    onRedeem={handleRedeemClick}
                    darkMode={true}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <p className="text-gray-400">No rewards match your filter</p>
              </div>
            )}
          </div>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-4 space-x-1">
            {filteredRewards.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? 'bg-[#9966cb]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scan to earn button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleScanClick}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#9966cb] to-[#43D0B9] text-white rounded-xl font-bold text-lg flex items-center justify-center space-x-2 shadow-lg mb-8"
        >
          <SafeIcon icon={FiCamera} className="text-xl" />
          <span>Scan to Earn Points</span>
        </motion.button>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-2xl shadow-md p-6 mb-20 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'earned' ? 'bg-green-900' : 'bg-purple-900'
                  }`}>
                    <SafeIcon 
                      icon={transaction.type === 'earned' ? FiStar : FiGift} 
                      className={`text-lg ${
                        transaction.type === 'earned' ? 'text-green-300' : 'text-[#9966cb]'
                      }`} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{transaction.description}</p>
                    <p className="text-xs text-gray-400">
                      {getBusinessName(transaction.businessId)} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${
                    transaction.type === 'earned' ? 'text-green-300' : 'text-[#9966cb]'
                  }`}>
                    {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <SafeIcon icon={FiClock} className="text-gray-600 text-3xl mb-2 mx-auto" />
                <p className="text-sm text-gray-400">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation darkMode={true} />

      {/* Redeem Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700"
          >
            <h3 className="text-lg font-bold text-white mb-4">Confirm Redemption</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to redeem "{selectedReward.title}" for {selectedReward.pointsRequired} points?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowRedeemModal(false)}
                className="flex-1 border border-gray-600 text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRedeem}
                className="flex-1 bg-[#9966cb] text-white py-3 px-4 rounded-xl hover:bg-opacity-90"
              >
                Redeem
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Scan Modal */}
      {showScanModal && (
        <ScanModal onClose={() => setShowScanModal(false)} darkMode={true} />
      )}
    </div>
  );
};

export default UserRewards;