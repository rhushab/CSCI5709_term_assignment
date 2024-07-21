import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AddTransaction from './components/AddTransaction';
import Summary from './components/Summary';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css'; // Import the global styles

import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [isRegistered, setIsRegistered] = useState(true); // Toggle between login and register
  const [transactions, setTransactions] = useState([]);

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        `https://68aa4kkp17.execute-api.us-east-1.amazonaws.com/prod/summary?userId=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedTransactions = response.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setTransactions(sortedTransactions);
    } catch (err) {
      console.error('Error fetching summary:', err);
    }
  };

  useEffect(() => {
    if (token && email) {
      fetchSummary();
    }
  }, [token, email]);

  const handleLogin = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  };

  const handleLogout = () => {
    setToken(null);
    setEmail('');
    setTransactions([]);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {!token ? (
              <>
                <Route
                  path="/login"
                  element={<Login setToken={handleLogin} setEmail={setEmail} />}
                />
                <Route
                  path="/register"
                  element={<Register setIsRegistered={setIsRegistered} />}
                />
                <Route
                  path="/"
                  element={
                    isRegistered ? (
                      <Login setToken={handleLogin} setEmail={setEmail} />
                    ) : (
                      <Register setIsRegistered={setIsRegistered} />
                    )
                  }
                />
              </>
            ) : (
              <>
                <Route
                  path="/add-transaction"
                  element={
                    <AddTransaction
                      token={token}
                      email={email}
                      fetchSummary={fetchSummary}
                    />
                  }
                />
                <Route
                  path="/summary"
                  element={
                    <Summary
                      token={token}
                      email={email}
                      transactions={transactions}
                    />
                  }
                />
                <Route
                  path="/"
                  element={
                    <>
                      <AddTransaction
                        token={token}
                        email={email}
                        fetchSummary={fetchSummary}
                      />
                      <Summary
                        token={token}
                        email={email}
                        transactions={transactions}
                      />
                    </>
                  }
                />
              </>
            )}
          </Routes>
          {token && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
