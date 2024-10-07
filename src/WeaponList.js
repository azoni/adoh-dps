import React, { useState, useEffect } from 'react';
import './WeaponList.css';
import WeaponDetails from './WeaponDetails'; // Import the new component
import { AppContext } from './AppContext';
import { useContext } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const WeaponList = ({ setSelectedWeapon }) => {
  const [tempSelect, settempSelect] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const {weapons, setWeapons} = useContext(AppContext);
  useEffect(() => {
    const apiUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : 'https://adoh-dps-backend.onrender.com';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setWeapons(data))
      .catch(error => console.error('Error fetching weapons:', error));
  }, [setWeapons]);

  const filteredWeapons = Object.keys(weapons).filter(weaponName =>
    weaponName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedWeapons = filteredWeapons.sort((a, b) => {
    const aValue = weapons[a][sortConfig.key];
    const bValue = weapons[b][sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleRowClick = (weaponName) => {
    setSelectedWeapon(weaponName);
    settempSelect(weaponName)
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h1>ADOH Purple Weapon Calculator (Doesn't work yet. No calculations.)</h1>
      <h3>(Click column names to sort, no icons yet. Player stats ac, and resists dont do anything yet.)</h3>
      <input
        type="text"
        placeholder="Search for a weapon..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className='container'>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>Name <i className={`fas fa-sort-${sortConfig.key === 'name' ? sortConfig.direction : 'disabled'}`}></i></th>
                <th onClick={() => handleSort('base_damage')}>Base Damage <i className={`fas fa-sort-${sortConfig.key === 'base_damage' ? sortConfig.direction : 'disabled'}`}></i></th>
                {/* <th onClick={() => handleSort('crit')}>Crit <i className={`fas fa-sort-${sortConfig.key === 'crit' ? sortConfig.direction : 'disabled'}`}></i></th> */}
                <th onClick={() => handleSort('damage')}>Average Damage <i className={`fas fa-sort-${sortConfig.key === 'damage' ? sortConfig.direction : 'disabled'}`}></i></th>
                <th onClick={() => handleSort('feat')}>Feat <i className={`fas fa-sort-${sortConfig.key === 'feat' ? sortConfig.direction : 'disabled'}`}></i></th>
                <th onClick={() => handleSort('size')}>Size <i className={`fas fa-sort-${sortConfig.key === 'size' ? sortConfig.direction : 'disabled'}`}></i></th>
                <th onClick={() => handleSort('type')}>Type <i className={`fas fa-sort-${sortConfig.key === 'type' ? sortConfig.direction : 'disabled'}`}></i></th>
                <th>Damage Properties</th>
              </tr>
            </thead>
            <tbody>
              {sortedWeapons.map(weaponName => (
                <tr 
                  key={weaponName} 
                  onClick={() => handleRowClick(weaponName)} 
                  style={{ backgroundColor: tempSelect === weaponName ? '#d1e7dd' : 'transparent' }}>
                  <td>{weaponName}</td>
                  <td>{weapons[weaponName].base_damage}</td>
                  {/* <td>{weapons[weaponName].crit}</td> */}
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
      </div>
      {tempSelect && (
        <WeaponDetails weapon={{ ...weapons[tempSelect], name: tempSelect }} />
      )}
    </div>
  );
};

export default WeaponList;
