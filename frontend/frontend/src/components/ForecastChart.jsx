import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../App.css';

const ForecastChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Sample data, replace with API data as needed
    const data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [
        {
          label: 'Forecasted Demand',
          data: [120, 150, 180, 130, 170, 200],
          fill: false,
          borderColor: '#007bff',
          tension: 0.1
        }
      ]
    };
    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
          title: { display: true, text: 'AI Demand Forecast (Sample)' }
        }
      }
    });
    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="forecast-chart-section">
      <canvas ref={chartRef} width={400} height={200}></canvas>
    </div>
  );
};

export default ForecastChart;
