import React, { useState, useEffect } from 'react';
import './WeaponList.css';

const WeaponList = () => {
  const [weapons, setWeapons] = useState({});
  const [selectedWeapon, setSelectedWeapon] = useState(null); // State for selected weapon

  useEffect(() => {
    const apiUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : 'https://adoh-dps-backend.onrender.com';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();  // Only parse JSON if response is okay
      })
      .then(data => setWeapons(data))
      .catch(error => console.error('Error fetching weapons:', error));
  }, []);

  // Handler for row click
  const handleRowClick = (weaponName) => {
    setSelectedWeapon(weaponName); // Set the clicked weapon as selected
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Base Damage</th>
            <th>Crit</th>
            <th>Total Damage</th>
            <th>Feat</th>
            <th>Size</th>
            <th>Type</th>
            <th>Is Monk</th>
            <th>Damage Properties</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(weapons).map(weaponName => (
            <tr 
              key={weaponName} 
              onClick={() => handleRowClick(weaponName)} 
              style={{ backgroundColor: selectedWeapon === weaponName ? '#d1e7dd' : 'transparent' }} // Highlight selected row
            >
              <td>{weaponName}</td>
              <td>{weapons[weaponName].base_damage}</td>
              <td>{weapons[weaponName].crit}</td>
              <td>{weapons[weaponName].damage}</td>
              <td>{weapons[weaponName].feat}</td>
              <td>{weapons[weaponName].size}</td>
              <td>{weapons[weaponName].type}</td>
              <td>{weapons[weaponName].is_monk ? 'Yes' : 'No'}</td>
              <td>
                {weapons[weaponName].properties.map((property, index) => (
                  <div key={index}>{property}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeaponList;
