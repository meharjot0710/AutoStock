import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Forecast = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/inventory-recommendations')
      .then(res => {console.log(res.data); return res})
      .then(res => setData(res.data.items))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Forecast</h2>
      <div className="overflow-auto max-h-[75vh]">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Store ID</th>
              <th className="py-2 px-4 border">Item ID</th>
              {/* <th className="py-2 px-4 border">Date</th> */}
              <th className="py-2 px-4 border">Predicted Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{row.store_id}</td>
                <td className="py-2 px-4 border">{row.item_id}</td>
                {/* <td className="py-2 px-4 border">{row.date}</td> */}
                <td className="py-2 px-4 border">{row.reorder_qty.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Forecast;