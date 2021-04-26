import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedIn = await axios.get('/api/auth/admin/loggedin');
    setLoggedIn(loggedIn.data);
  };
  useEffect(() => {
    getLoggedIn();
  }, []);
  return (
    <AdminContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
export { AdminContextProvider };
