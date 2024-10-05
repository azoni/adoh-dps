import React, { useState } from 'react';
import WeaponList from './WeaponList';
import Player from './Player';
import { AppProvider } from './AppContext';
import DamageCalculator from './DamageCalculator';
import './App.css'; // Import the CSS for styling

function App() {
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  return (
    <div className="App">
      <AppProvider>
      {/* Container for the left side (Player and DamageCalculator) */}
      <div className="main-content">
        <Player />
        <DamageCalculator selectedWeapon={selectedWeapon}/>
      </div>

      {/* Weapon List on the right side */}
      <WeaponList setSelectedWeapon={setSelectedWeapon}/>
      </AppProvider>
    </div>
  );
}

export default App;
