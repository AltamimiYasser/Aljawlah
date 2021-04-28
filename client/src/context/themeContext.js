import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState('light');

  const changeTheme = (color) => setTheme(color);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider };
export default ThemeContext;
