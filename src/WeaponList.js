import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeaponList.css';

const WeaponList = () => {
  const [weaponData, setWeaponData] = useState('');

  useEffect(() => {
    // Fetch the data from Flask backend
    axios.get('http://127.0.0.1:5000/')
    //axios.get('https://adoh-dps-backend.onrender.com')
      .then(response => {
        // Set the response data (which contains HTML) to state
        setWeaponData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the weapon data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Weapon Data</h1>
      {/* Render the HTML from Flask */}
      <div dangerouslySetInnerHTML={{ __html: weaponData }} />
    </div>
  );
};

export default WeaponList;
