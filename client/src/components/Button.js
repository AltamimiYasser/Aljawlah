import React from 'react';
import styled, { css } from 'styled-components';

const myCss = css`
  background-color: ${({ color }) => color || 'white'};
`;

const StyledButton = styled.button`
  ${myCss};
  color: white;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 90%;
  text-align: center;
  line-height: 40px;
  font-size: 2rem;
  padding: 10px 20px;
  border-radius: 6px;
  /* #24a0ed */
  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({ color, label }) => {
  return <StyledButton color={color}> {label} </StyledButton>;
};

export default Button;
