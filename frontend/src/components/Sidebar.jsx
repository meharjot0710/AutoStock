import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Forecast', path: '/forecast' },
    { name: 'Assistant', path: '/assistant' },
  ];

  return (
    <div className="sidebar">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', letterSpacing: '1px', color: '#a5b4fc', textAlign: 'center' }}>AutoStock.AI</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {navItems.map(item => (
          <li key={item.name} style={{ margin: '1.5rem 0' }}>
            <Link
              to={item.path}
              className={`sidebar-link${location.pathname === item.path ? ' active' : ''}`}
              style={{
                display: 'block',
                padding: '0.7rem 1.2rem',
                borderRadius: '8px',
                color: location.pathname === item.path ? '#fff' : '#c7d2fe',
                background: location.pathname === item.path ? 'linear-gradient(90deg, #6366f1 60%, #3730a3 100%)' : 'none',
                fontWeight: location.pathname === item.path ? 600 : 400,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;