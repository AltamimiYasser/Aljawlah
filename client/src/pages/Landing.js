import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import background from '../assets/bg.jpg';
import AdminContext from '../context/adminContext';
import UserContext from '../context/userContext';
import ThemeContext from '../context/themeContext';
import { Redirect } from 'react-router';

const Container = styled.div`
  .bg {
    height: 540px;
    z-index: -1;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(74, 72, 72, 0.5);
    width: 100%;
    &::before {
      content: '';
      background-image: url(${background});
      background-size: cover;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      opacity: 0.5;
      background-repeat: no-repeat;
      background-position: 0 -60px;
      /* box-shadow: 0 0 3px 3px white inset; */
    }
  }
  h1 {
    position: absolute;
    width: 100%;
    height: 150px;
    top: 50%;
    margin-top: -50px;
    color: #443333;
    font-size: 6rem;
    text-align: center;
    white-space: nowrap;
  }
`;

const Landing = () => {
  const { changeTheme } = useContext(ThemeContext);
  useEffect(() => {
    if (changeTheme) changeTheme('dark');
  }, [changeTheme]);

  const { loggedIn: loggedInAdmin } = useContext(AdminContext);

  const { loggedIn: loggedInUser } = useContext(UserContext);

  return (
    <>
      {loggedInAdmin ? <Redirect to='/bikes' /> : null}
      {loggedInUser ? <Redirect to='/rents' /> : null}
      <Container>
        <div className='bg' />
        <h1>Al-jawlah</h1>
      </Container>
    </>
  );
};

export default Landing;
