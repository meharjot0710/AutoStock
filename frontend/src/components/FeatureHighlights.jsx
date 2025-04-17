import React from 'react';
import '../App.css';

const features = [
  {
    title: 'Real-Time Inventory Tracking',
    desc: 'Monitor live stock levels across all locations, synced with POS & warehouses.'
  },
  {
    title: 'AI-Powered Demand Forecasting',
    desc: 'Machine learning + RAG using sales, weather, media, and holidays.'
  },
  {
    title: 'Autonomous Reordering Engine',
    desc: 'Predicts restock needs and auto-generates purchase orders.'
  },
  {
    title: 'Stockout & Overstock Prevention',
    desc: 'Maintains optimal stock, alerts for abnormal demand surges/dips.'
  },
  {
    title: 'Multi-Channel Integration',
    desc: 'Unified inventory across online, offline, and in-store platforms.'
  },
  {
    title: 'Scalability Across Categories',
    desc: 'Supports electronics, fashion, grocery, and more.'
  },
  {
    title: 'Smart Pattern Recognition',
    desc: 'Detects demand anomalies and trends.'
  }
];

const FeatureHighlights = () => (
  <div className="feature-highlights">
    {features.map((f, idx) => (
      <div key={idx} className="feature-card">
        <h3>{f.title}</h3>
        <p>{f.desc}</p>
      </div>
    ))}
  </div>
);

export default FeatureHighlights;
