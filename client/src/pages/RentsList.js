import React, { useContext, useEffect } from 'react';
import ThemeContext from '../context/themeContext';

const RentsList = () => {
  const { changeTheme } = useContext(ThemeContext);
  useEffect(() => {
    if (changeTheme) changeTheme('light');
  }, [changeTheme]);
  return (
    <div>
      <ul>
        <li>List HERE</li>
      </ul>
    </div>
  );
};

export default RentsList;
