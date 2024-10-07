import React, { useState } from 'react';
import './DamageCalculator.css';  // Make sure to import your CSS file
import { AppContext } from './AppContext';
import { useContext } from 'react';

const DamageCalculator = ({ selectedWeapon }) => {
  const [formData, setFormData] = useState({
    physical: { immunity: '25', resist: '0' }, // Default values
    fire: { immunity: '25', resist: '0' },
    cold: { immunity: '25', resist: '0' },
    electric: { immunity: '25', resist: '0' },
    acid: { immunity: '25', resist: '0' },
    sonic: { immunity: '25', resist: '0' },
    negative: { immunity: '25', resist: '0' },
    positive: { immunity: '10', resist: '0' },
    divine: { immunity: '10', resist: '0' },
    magical: { immunity: '10', resist: '0' },
    pure: { immunity: '0', resist: '0' }
  });
  const {playerStats, setWeapons} = useContext(AppContext);
  const [damage, setDamage] = useState(null);
  const [armorClass, setArmorClass] = useState('');
  const [criticalHitImmunity, setCriticalHitImmunity] = useState(false);
  const [sneakAttackImmunity, setSneakAttackImmunity] = useState(false);
  const handleChange = (e, type, field) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [field]: value,
      },
    }));
  };
  const handleArmorClassChange = (e) => {
    setArmorClass(e.target.value);
  };

  const handleSneakAttackImmunityChange = () => {
    setSneakAttackImmunity(prev => !prev);
  };
  const handleCriticalHitImmunityChange = () => {
    setCriticalHitImmunity(prev => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      immunities: Object.keys(formData).map(type => ({
        type,
        value: formData[type].immunity,
      })).filter(item => item.value), // Filter out empty values
      resists: Object.keys(formData).map(type => ({
        type,
        value: formData[type].resist,
      })).filter(item => item.value), // Filter out empty values
      armorClass,
      criticalHitImmunity,
      sneakAttackImmunity,
      weapon: selectedWeapon,
      player: playerStats,
    };

    try {
      const apiUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5000/calculate_damage'
      : 'https://adoh-dps-backend.onrender.com/calculate_damage';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if(selectedWeapon !== null) {
        setDamage(result.damage[selectedWeapon]['damage']);
      } else {
        setDamage('')
      }
      setWeapons(result.damage)
    } catch (error) {
      console.error('Error calculating damage:', error);
    }
  };

  return (
    <div className="damage-calculator-container">
      <h2>Target Stats</h2>
      <form onSubmit={handleSubmit} className="damage-calculator-form">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Immunity</th>
              <th>Resist</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(formData).map(type => (
              <tr key={type}>
                <td>{type.charAt(0).toUpperCase() + type.slice(1)}</td>
                <td>
                  <input
                    type="text"
                    value={formData[type].immunity}
                    onChange={(e) => handleChange(e, type, 'immunity')}
                    placeholder="Immunity"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={formData[type].resist}
                    onChange={(e) => handleChange(e, type, 'resist')}
                    placeholder="Resist"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Container for Armor Class, Critical Hit Immunity, and Button */}
        <div className="form-footer">
          <div className="armor-class-container">
            <label htmlFor="armorClass">AC:</label>
            <input
              type="input"
              id="armorClass"
              value={armorClass}
              onChange={handleArmorClassChange}
              placeholder="Armor Class"
            />
          </div>

          <div className="critical-hit-immunity-container">
            <label>
              <input
                type="checkbox"
                checked={criticalHitImmunity}
                onChange={handleCriticalHitImmunityChange}
              />
              Crit Immune
            </label>
          </div>
          <div className="critical-hit-immunity-container">
            <label>
              <input
                type="checkbox"
                checked={sneakAttackImmunity}
                onChange={handleSneakAttackImmunityChange}
              />
              Sneak Immune
            </label>
          </div>
          <div className="button-container">
            <button type="submit">Calculate</button>
          </div>
        </div>

      </form>
      {damage !== null && (
        <div className="calculated-damage">
          <h2>Calculated Damage: {damage}</h2>
        </div>
      )}
    </div>
  );
};

export default DamageCalculator;
