import React from 'react';
import FeatureHighlights from '../components/FeatureHighlights';
import InventoryTable from '../components/InventoryTable';
import ForecastChart from '../components/ForecastChart';
import Alerts from '../components/Alerts';
import OrderModal from '../components/OrderModal';
import '../App.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Smart Inventory Dashboard</h1>
      <FeatureHighlights />
      <div className="dashboard-main">
        <div className="dashboard-section">
          <h2>Real-Time Inventory Tracking</h2>
          <InventoryTable />
        </div>
        <div className="dashboard-section">
          <h2>AI-Powered Demand Forecasting</h2>
          <ForecastChart />
        </div>
      </div>
      <Alerts />
      <OrderModal />
    </div>
  );
};

export default Dashboard;
