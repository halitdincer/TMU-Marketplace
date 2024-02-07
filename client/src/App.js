import logo from './logo.svg';
import './App.css';
import React from 'react';
import AdsList from './components/AdsList'; // Make sure this path is correct

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to TMU Marketplace</h1>
      </header>
      <main>
        <AdsList />
      </main>
    </div>
  );
}

export default App;