// WeaponInfo.js

import React from 'react';
import './WeaponInfo.css'; // Import the CSS for styling

const WeaponInfo = () => {
  // Sample weapon data for display
  const weaponData = [
    { name: 'Physical', damage: '2d8'},
    { name: 'Fire', damage: '2d6'},
    { name: 'Cold', damage: '2d6'},
    { name: 'Electrical', damage: '2d6'},
    { name: 'Acid', damage: '2d6'},
  ];
  return (
    <div className="weapon-info-container">
      <h2>Elemental Impaler</h2>
      <table>
        <thead>
          <tr>
            <th>Damage Dice</th>
            <th>Damage Type</th>
          </tr>
        </thead>
        <tbody>
          {weaponData.map((weapon) => (
            <tr key={weapon.name}>
              <td>{weapon.name}</td>
              <td>{weapon.damage}</td>
              {/* <td>{weapon.properties.join(', ')}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default WeaponInfo;
