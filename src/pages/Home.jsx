import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAward, FiUsers, FiTrendingUp, FiGift, FiArrowRight, FiStar } = FiIcons;

const Home = () => {
  const { user, isBusiness } = useAuth();
  const { businesses } = useData();

  const features = [
    {
      icon: FiAward,
      title: 'Reward Loyalty',
      description: 'Create engaging reward programs that keep customers coming back',
    },
    {
      icon: FiUsers,
      title: 'Build Community',
      description: 'Foster stronger relationships between businesses and customers',
    },
    {
      icon: FiTrendingUp,
      title: 'Drive Growth',
      description: 'Increase customer retention and boost revenue with data-driven insights',
    },
    {
      icon: FiGift,
      title: 'Easy Redemption',
      description: 'Simple and seamless reward redemption process for customers',
    },
  ];

  const stats = [
    { label: 'Active Businesses', value: '1,200+' },
    { label: 'Happy Customers', value: '50K+' },
    { label: 'Rewards Redeemed', value: '2M+' },
    { label: 'Points Earned', value: '100M+' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-850 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Loyalty Programs <span className="text-[#9966cb] block">Made Simple</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              PerkStack helps businesses create engaging reward programs while making it easy for customers to earn and redeem perks from their favorite brands.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {user ? (
                <Link
                  to={isBusiness ? "/business" : "/rewards"}
                  className="bg-gradient-to-r from-[#9966cb] to-[#43D0B9] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                  <span>{isBusiness ? 'Go to Dashboard' : 'View My Rewards'}</span>
                  <SafeIcon icon={FiArrowRight} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="bg-gradient-to-r from-[#9966cb] to-[#43D0B9] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <span>Get Started</span>
                    <SafeIcon icon={FiArrowRight} />
                  </Link>
                  <Link
                    to="/auth"
                    className="border border-[#9966cb] text-[#9966cb] px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    For Businesses
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-850 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[#43D0B9] mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose PerkStack?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to create, manage, and optimize your customer loyalty program
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-850 p-6 rounded-xl shadow-md border border-gray-700 hover:border-[#9966cb] transition-colors"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="text-[#9966cb] text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="bg-gray-850 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Partner Businesses
            </h2>
            <p className="text-xl text-gray-300">
              Discover amazing rewards from top local businesses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {businesses.slice(0, 3).map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-[#9966cb] transition-colors"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={business.logo}
                    alt={business.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{business.name}</h3>
                    <p className="text-sm text-gray-400">{business.category}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{business.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="text-[#43D0B9] text-sm" />
                    <span className="text-sm text-gray-400">
                      {business.pointsPerDollar} pts per $1
                    </span>
                  </div>
                  <span className="text-sm text-[#9966cb] font-medium">Join Program</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#9966cb] to-[#43D0B9] py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white text-opacity-80 mb-8">
            Join thousands of businesses and customers already using PerkStack
          </p>
          <Link
            to="/auth"
            className="bg-white text-[#9966cb] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 font-semibold"
          >
            <span>Start Your Journey</span>
            <SafeIcon icon={FiArrowRight} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;