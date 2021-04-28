import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedIn = await axios.get('/api/auth/users/loggedin');
    setLoggedIn(loggedIn.data);
  };
  useEffect(() => {
    getLoggedIn();
  }, []);
  return (
    <UserContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserContextProvider };
