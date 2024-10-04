import React, { useState, useEffect } from 'react';

const WeaponList = () => {
  const [weapons, setWeapons] = useState({});

  useEffect(() => {
    const apiUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : 'https://adoh-dps-backend.onrender.com';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setWeapons(data))
      .catch(error => console.error('Error fetching weapons:', error));
  }, []);

  return (
    <div>
      <table border="1">
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
            <tr key={weaponName}>
              <td>{weaponName}</td>
              <td>{weapons[weaponName].base_damage}</td>
              <td>{weapons[weaponName].crit}</td>
              <td>{weapons[weaponName].damage}</td>
              <td>{weapons[weaponName].feat}</td>
              <td>{weapons[weaponName].size}</td>
              <td>{weapons[weaponName].type}</td>
              <td>{weapons[weaponName].target_damage}</td>
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
