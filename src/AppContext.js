import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [playerStats, setPlayerStats] = useState({
    AB: '65',
    strMod: '',
    EB: '10',
    "2Handed": false,
    keen: true,
    "Imp Crit": true,
    WM: false,
    shifted: false,
  });
  const [weapons, setWeapons] = useState({});

  return (
    <AppContext.Provider value={{ playerStats, setPlayerStats, weapons, setWeapons }}>
      {children}
    </AppContext.Provider>
  );
};
