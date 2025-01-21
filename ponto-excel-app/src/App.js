import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AppContent from './components/AppContent';

function App() {
  return (
    <div className="App">
      <Header />
      <AppContent />
      <Footer />
    </div>
  );
}

export default App;
