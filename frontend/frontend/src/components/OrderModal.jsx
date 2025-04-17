import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const OrderModal = () => {
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState('');
  const [storeId, setStoreId] = useState('');
  const [qty, setQty] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const res = await axios.post('http://localhost:5000/manual-order', {
        item_id: itemId,
        store_id: storeId,
        quantity: qty
      });
      setStatus(res.data?.message || 'Order placed successfully!');
    } catch (err) {
      setStatus('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStatus('');
    setItemId('');
    setStoreId('');
    setQty('');
    setLoading(false);
  };

  return (
    <div className="order-modal-section">
      <button className="order-btn" onClick={() => setOpen(true)}>
        Place Manual Order
      </button>
      {open && (
        <div className="modal-backdrop" onClick={handleClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Manual Order Placement</h3>
            <form onSubmit={handleOrder}>
              <input type="text" placeholder="Item ID" value={itemId} onChange={e => setItemId(e.target.value)} required />
              <input type="text" placeholder="Store ID" value={storeId} onChange={e => setStoreId(e.target.value)} required />
              <input type="number" placeholder="Quantity" value={qty} onChange={e => setQty(e.target.value)} required min="1" />
              <button type="submit" disabled={loading}>{loading ? 'Placing...' : 'Place Order'}</button>
              <button type="button" onClick={handleClose}>Cancel</button>
            </form>
            {status && <div className="order-status-msg">{status}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderModal;
