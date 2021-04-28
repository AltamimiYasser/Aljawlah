import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Link to='/adminlogin'>Admin Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/admin-dashboard'>Admin Dashboard</Link>
    </div>
  );
};

export default Navbar;
