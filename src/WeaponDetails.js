// WeaponDetails.js
import React from 'react';
import './WeaponList.css';

const WeaponDetails = ({ weapon }) => {
  return (
    <div className="weapon-details">
      <h3>{weapon.name}</h3>
      {/* <strong>Base Damage:</strong> {weapon.base_damage}
      <strong>Crit:</strong> {weapon.crit}
      <strong>Total Damage:</strong> {weapon.damage}
      <strong>Feat:</strong> {weapon.feat}
      <strong>Size:</strong> {weapon.size}
      <strong>Type:</strong> {weapon.type}
      <br></br> */}
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
