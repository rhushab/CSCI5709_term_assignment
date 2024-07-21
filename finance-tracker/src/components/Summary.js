import React, { useState } from 'react';
import './Summary.css';

const Summary = ({ transactions }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const displayedTransactions = showAll
    ? transactions
    : transactions.slice(0, 3);

  return (
    <div className="summary-container">
      <h2>Summary</h2>
      {transactions.length > 0 ? (
        <div>
          <h3>Transactions:</h3>
          <ul>
            {displayedTransactions.map((transaction, index) => (
              <li key={index}>
                <p>Amount: {transaction.amount}</p>
                <p>Category: {transaction.category}</p>
                <p>
                  Timestamp: {new Date(transaction.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          {transactions.length > 3 && (
            <button onClick={handleShowMore} className="show-more-button">
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Summary;
