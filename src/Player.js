import './Player.css';
import './DamageCalculator.css'; 
import { AppContext } from './AppContext';
import { useContext } from 'react';

const Player = () => {

  const {playerStats, setPlayerStats } = useContext(AppContext);
  const handleInputChange = (e) => {
    const { name, type, value } = e.target;
    const newValue = type === 'checkbox' ? e.target.checked : value;
    setPlayerStats((prevStats) => ({
      ...prevStats,
      [name]: newValue,
    }));
  };

  return (
    <div className="Player">
      <h2>Player Stats</h2>
      <table className="player-stats-table">
        <tbody>
          {Object.entries(playerStats).reduce((rows, [key, value], index) => {
            // Create a new row every 4 columns
            if (index % 4 === 0) rows.push([]);
            const row = rows[rows.length - 1];
            row.push(
              <td key={key}>
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <br />
                {typeof value === 'boolean' ? (
                  <input
                    type="checkbox"
                    id={key}
                    name={key}
                    checked={value}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                  />
                )}
              </td>
            );
            return rows;
          }, []).map((row, index) => (
            <tr key={index}>{row}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Player;
