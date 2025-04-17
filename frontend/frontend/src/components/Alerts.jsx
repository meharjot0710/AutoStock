import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulate fetching alerts from backend
    axios.get('http://localhost:5000/alerts')
      .then(res => setAlerts(res.data.alerts || []))
      .catch(() => setAlerts([
        { type: 'stockout', message: 'Stockout risk detected for Item 101 at Store 3.' },
        { type: 'overstock', message: 'Potential overstock for Item 205 at Store 1.' }
      ]));
  }, []);

  return (
    <div className="alerts-section">
      <h3>Alerts</h3>
      {alerts.length === 0 ? (
        <p>No alerts.</p>
      ) : alerts.map((alert, idx) => (
        <div key={idx} className={`alert-card alert-${alert.type}`}>
          {alert.message}
        </div>
      ))}
    </div>
  );
};

export default Alerts;
