import React, { useState } from 'react';
import axios from 'axios';
import './AddTransaction.css';

const AddTransaction = ({ token, email, fetchSummary }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://68aa4kkp17.execute-api.us-east-1.amazonaws.com/prod/add-transaction',
        {
          userId: email,
          amount,
          category,
          timestamp: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('Transaction added successfully!');
      setAmount('');
      setCategory('');
      fetchSummary(); // Refresh summary after adding a transaction
    } catch (err) {
      setError('Failed to add transaction. Please try again.');
    }
  };

  return (
    <div className="add-transaction-container">
      <h2>Add Transaction</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
