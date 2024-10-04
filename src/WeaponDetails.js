// WeaponDetails.js
import React from 'react';
import './WeaponList.css';

const WeaponDetails = ({ weapon }) => {
  return (
    <div className="weapon-details">
      <h3>{weapon.name}</h3>
      <p><strong>Base Damage:</strong> {weapon.base_damage}</p>
      <p><strong>Crit:</strong> {weapon.crit}</p>
      <p><strong>Total Damage:</strong> {weapon.damage}</p>
      <p><strong>Feat:</strong> {weapon.feat}</p>
      <p><strong>Size:</strong> {weapon.size}</p>
      <p><strong>Type:</strong> {weapon.type}</p>
      
        <strong>Damage Properties:</strong>
        <ul>
          {Array.isArray(weapon.properties) ? (
            weapon.properties.map((property, index) => (
              <li key={index}>{property}</li>
            ))
          ) : (
            <li>No properties available</li>
          )}
        </ul>
    </div>
  );
};

export default WeaponDetails;
