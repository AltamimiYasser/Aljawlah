import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// ------------------STYLE-------------------------- //
const StyledAlert = styled.div`
  padding: 0.8rem;
  margin: 1rem 0;
  opacity: 0.9;
  color: #fff;
  background-color: ${(props) => props.color};
  min-width: 350px;
  text-align: center;
  font-family: 'Raleway';
  border-radius: 8px;
`;
// ------------------STYLE-------------------------- //

const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  return (
    <>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <StyledAlert key={alert.id} color={`${alert.alertColor}`}>
            {alert.msg}
          </StyledAlert>
        ))}
    </>
  );
};

export default Alert;
