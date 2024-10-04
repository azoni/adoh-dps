import React, { useState } from 'react';
import './DamageCalculator.css';  // Make sure to import your CSS file

const DamageCalculator = () => {
  const [formData, setFormData] = useState({
    fire: { immunity: '', resist: '' },
    cold: { immunity: '', resist: '' },
    electric: { immunity: '', resist: '' },
    acid: { immunity: '', resist: '' },
    sonic: { immunity: '', resist: '' },
    negative: { immunity: '', resist: '' },
    positive: { immunity: '', resist: '' },
    divine: { immunity: '', resist: '' },
    magical: { immunity: '', resist: '' },
    pure: { immunity: '', resist: '' },
  });

  const [damage, setDamage] = useState(null);
  const [armorClass, setArmorClass] = useState('');
  const [criticalHitImmunity, setCriticalHitImmunity] = useState(false);
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
    };

    try {
      const response = await fetch('http://localhost:5000/calculate_damage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      setDamage(result.damage);
    } catch (error) {
      console.error('Error calculating damage:', error);
    }
  };

  return (
    <div className="damage-calculator-container">
      <h1>Damage Calculator</h1>
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
            <label htmlFor="armorClass">Armor Class:</label>
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
              Critical Hit Immunity
            </label>
          </div>
          <div className="critical-hit-immunity-container">
            <label>
              <input
                type="checkbox"
                checked={criticalHitImmunity}
                onChange={handleCriticalHitImmunityChange}
              />
              Sneak Attack Immunity
            </label>
          </div>
          <div className="button-container">
            <button type="submit">Calculate Damage</button>
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
