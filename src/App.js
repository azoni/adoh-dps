import React from 'react';
import WeaponList from './WeaponList';
import DamageCalculator from './DamageCalculator';
// import WeaponInfo from './WeaponInfo';
import './App.css'; // Import the CSS for styling

function App() {
  return (
    <div className="App" >
      <DamageCalculator />
      {/* <WeaponInfo /> */}
      <WeaponList />
    </div>
  );
}

export default App;
