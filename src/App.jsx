import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import BusinessDashboard from './pages/BusinessDashboard';
import UserRewards from './pages/UserRewards';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/auth" element={
              <Layout>
                <Auth />
              </Layout>
            } />
            <Route path="/business" element={
              <Layout>
                <BusinessDashboard />
              </Layout>
            } />
            <Route path="/rewards" element={<UserRewards />} />
            <Route path="/scan" element={<UserRewards />} />
            <Route path="/offers" element={<UserRewards />} />
            <Route path="/account" element={<UserRewards />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;