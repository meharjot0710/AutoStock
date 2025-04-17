import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 50;

  const fetchData = (page) => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/inventory-recommendations?page=${page}&limit=${itemsPerPage}`)
      .then((res) => {
        setInventoryData(res.data.items);
        // setFilteredData(res.data.items);
        setTotalPages(res.data.totalPages);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching inventory data');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    setFilteredData(
      inventoryData.filter((item) =>
        item.item_id.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.store_id.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, inventoryData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="inventory-table-section">
      <input
        className="search-bar"
        type="text"
        placeholder="Search by Item or Store ID..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {error && <div className="order-status-msg" style={{color: 'red'}}>{error}</div>}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Store ID</th>
            <th>Item ID</th>
            <th>Forecasted Demand (45 days)</th>
            <th>Current Inventory</th>
            <th>Buffer Stock</th>
            <th>Reorder Quantity</th>
            <th>Reorder Required</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="7">Loading...</td></tr>
          ) : filteredData.length === 0 ? (
            <tr><td colSpan="7">No results found.</td></tr>
          ) : filteredData.map((item, idx) => (
            <tr key={idx} className={item.reorder_required ? 'row-alert' : ''}>
              <td>{item.store_id}</td>
              <td>{item.item_id}</td>
              <td>{item.forecasted_45_day_demand}</td>
              <td>{item.current_inventory}</td>
              <td>{item.buffer_stock}</td>
              <td>{item.reorder_qty}</td>
              <td>{item.reorder_required ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default InventoryTable;
