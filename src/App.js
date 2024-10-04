import React from 'react';
import WeaponList from './WeaponList';
import DamageCalculator from './DamageCalculator';
import './App.css'; // Import the CSS for styling

function App() {
  return (
    <div className="App">
      {/* Container for the left side (Player and DamageCalculator) */}
      <div className="main-content">
        <DamageCalculator />
      </div>

      {/* Weapon List on the right side */}
      <WeaponList />
    </div>
  );
}

export default App;
