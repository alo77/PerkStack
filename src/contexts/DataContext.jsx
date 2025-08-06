import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Mock data
const mockBusinesses = [
  {
    id: '1',
    name: 'Coffee Central',
    logo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop&crop=center',
    category: 'Food & Beverage',
    pointsPerDollar: 10,
    description: 'Premium coffee and pastries',
  },
  {
    id: '2',
    name: 'FitLife Gym',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
    category: 'Fitness',
    pointsPerDollar: 5,
    description: 'Complete fitness center',
  },
  {
    id: '3',
    name: 'BookHaven',
    logo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop&crop=center',
    category: 'Books',
    pointsPerDollar: 15,
    description: 'Independent bookstore',
  },
];

const mockRewards = [
  {
    id: '1',
    businessId: '1',
    title: 'Free Coffee',
    description: 'Get a free coffee of your choice',
    pointsRequired: 100,
    category: 'Beverage',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&crop=center',
  },
  {
    id: '2',
    businessId: '1',
    title: '$5 Off Purchase',
    description: '$5 off any purchase over $20',
    pointsRequired: 250,
    category: 'Discount',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop&crop=center',
  },
  {
    id: '3',
    businessId: '2',
    title: 'Free Personal Training Session',
    description: 'One-on-one training session with certified trainer',
    pointsRequired: 500,
    category: 'Service',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center',
  },
  {
    id: '4',
    businessId: '3',
    title: '20% Off Any Book',
    description: 'Get 20% off any book in store',
    pointsRequired: 150,
    category: 'Discount',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
  },
];

const mockUserPoints = [
  { businessId: '1', points: 325 },
  { businessId: '2', points: 150 },
  { businessId: '3', points: 75 },
];

export const DataProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState(mockBusinesses);
  const [rewards, setRewards] = useState(mockRewards);
  const [userPoints, setUserPoints] = useState(mockUserPoints);
  const [transactions, setTransactions] = useState([]);

  const getUserPoints = (businessId) => {
    const userBusiness = userPoints.find(up => up.businessId === businessId);
    return userBusiness ? userBusiness.points : 0;
  };

  const addPoints = (businessId, points) => {
    setUserPoints(prev => {
      const existing = prev.find(up => up.businessId === businessId);
      if (existing) {
        return prev.map(up => 
          up.businessId === businessId 
            ? { ...up, points: up.points + points }
            : up
        );
      } else {
        return [...prev, { businessId, points }];
      }
    });

    // Add transaction
    const transaction = {
      id: Math.random().toString(36).substr(2, 9),
      businessId,
      points,
      type: 'earned',
      date: new Date().toISOString(),
      description: `Earned ${points} points`,
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const redeemReward = (rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return false;

    const currentPoints = getUserPoints(reward.businessId);
    if (currentPoints < reward.pointsRequired) return false;

    // Deduct points
    setUserPoints(prev => 
      prev.map(up => 
        up.businessId === reward.businessId 
          ? { ...up, points: up.points - reward.pointsRequired }
          : up
      )
    );

    // Add transaction
    const transaction = {
      id: Math.random().toString(36).substr(2, 9),
      businessId: reward.businessId,
      points: -reward.pointsRequired,
      type: 'redeemed',
      date: new Date().toISOString(),
      description: `Redeemed: ${reward.title}`,
      rewardId,
    };
    setTransactions(prev => [transaction, ...prev]);

    return true;
  };

  const value = {
    businesses,
    rewards,
    userPoints,
    transactions,
    getUserPoints,
    addPoints,
    redeemReward,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};