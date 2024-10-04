import React, { useState, useEffect } from 'react';
import './WeaponList.css';
import WeaponDetails from './WeaponDetails'; // Import the new component

const WeaponList = () => {
  const [weapons, setWeapons] = useState({});
  const [selectedWeapon, setSelectedWeapon] = useState(null); // State for selected weapon
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const apiUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : 'https://adoh-dps-backend.onrender.com';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); // Only parse JSON if response is okay
      })
      .then(data => setWeapons(data))
      .catch(error => console.error('Error fetching weapons:', error));
  }, []);
  // Filtered weapons based on the search term
  const filteredWeapons = Object.keys(weapons).filter(weaponName =>
    weaponName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Handler for row click
  const handleRowClick = (weaponName) => {
    setSelectedWeapon(weaponName); // Set the clicked weapon as selected
  };

  return (
    <div className='container'>
      <div className="table-container">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a weapon..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />
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
              <th>Damage Properties</th>
            </tr>
          </thead>
          <tbody>
          {filteredWeapons.map(weaponName => (
                <tr 
                key={weaponName} 
                onClick={() => handleRowClick(weaponName)} 
                style={{ backgroundColor: selectedWeapon === weaponName ? '#d1e7dd' : 'transparent' }}>
                <td>{weaponName}</td>
                <td>{weapons[weaponName].base_damage}</td>
                <td>{weapons[weaponName].crit}</td>
                <td>{weapons[weaponName].damage}</td>
                <td>{weapons[weaponName].feat}</td>
                <td>{weapons[weaponName].size}</td>
                <td>{weapons[weaponName].type}</td>
                <td>
                  {Array.isArray(weapons[weaponName].properties) && weapons[weaponName].properties.map((property, index) => (
                    <div key={index}>{property}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <WeaponDetails weapon={{ ...weapons[selectedWeapon], name: Object.keys(weapons).find(w => weapons[w] === weapons[selectedWeapon]) }} /> {/* Pass weapon details */}
    </div>
  );
};

export default WeaponList;
