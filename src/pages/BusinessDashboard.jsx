import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiTrendingUp, FiGift, FiDollarSign, FiPlus, FiEdit3, FiTrash2 } = FiIcons;

const BusinessDashboard = () => {
  const { user } = useAuth();
  const { businesses, rewards, userPoints, addPoints } = useData();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock business data - in real app, this would be filtered by business ID
  const businessData = {
    totalCustomers: 1247,
    totalPointsIssued: 125000,
    totalRedemptions: 342,
    revenue: 45000,
    recentActivity: [
      { id: 1, customer: 'John Doe', action: 'Earned 50 points', time: '2 hours ago' },
      { id: 2, customer: 'Jane Smith', action: 'Redeemed Free Coffee', time: '4 hours ago' },
      { id: 3, customer: 'Mike Johnson', action: 'Earned 25 points', time: '6 hours ago' },
    ],
  };

  const stats = [
    {
      title: 'Total Customers',
      value: businessData.totalCustomers.toLocaleString(),
      icon: FiUsers,
      color: 'text-[#43D0B9]',
      bg: 'bg-gray-750',
    },
    {
      title: 'Points Issued',
      value: businessData.totalPointsIssued.toLocaleString(),
      icon: FiTrendingUp,
      color: 'text-[#9966cb]',
      bg: 'bg-gray-750',
    },
    {
      title: 'Redemptions',
      value: businessData.totalRedemptions.toLocaleString(),
      icon: FiGift,
      color: 'text-[#43D0B9]',
      bg: 'bg-gray-750',
    },
    {
      title: 'Revenue',
      value: `$${businessData.revenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'text-[#9966cb]',
      bg: 'bg-gray-750',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'customers', label: 'Customers' },
  ];

  const handleAddPoints = (customerId, points) => {
    // Mock function - in real app, this would add points to specific customer
    addPoints('1', points); // Using business ID 1 for demo
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Business Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center border border-gray-600`}>
                  <SafeIcon icon={stat.icon} className={`${stat.color} text-xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 mb-8">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#9966cb] text-[#9966cb]'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {businessData.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 bg-gray-750 rounded-lg border border-gray-700"
                      >
                        <div>
                          <p className="font-medium text-white">{activity.customer}</p>
                          <p className="text-sm text-gray-400">{activity.action}</p>
                        </div>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Manage Rewards</h3>
                  <button className="bg-[#9966cb] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
                    <SafeIcon icon={FiPlus} />
                    <span>Add Reward</span>
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {rewards.slice(0, 4).map((reward) => (
                    <div
                      key={reward.id}
                      className="border border-gray-700 bg-gray-750 rounded-lg p-4"
                    >
                      <img
                        src={reward.image}
                        alt={reward.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-white mb-2">{reward.title}</h4>
                      <p className="text-sm text-gray-400 mb-3">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#43D0B9] font-medium">
                          {reward.pointsRequired} points
                        </span>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-[#9966cb]">
                            <SafeIcon icon={FiEdit3} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400">
                            <SafeIcon icon={FiTrash2} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Customer Management</h3>
                <div className="bg-gray-750 rounded-lg p-6 text-center border border-gray-700">
                  <p className="text-gray-300 mb-4">Customer management features coming soon!</p>
                  <p className="text-sm text-gray-500">
                    You'll be able to view customer profiles, points history, and send targeted
                    rewards.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;