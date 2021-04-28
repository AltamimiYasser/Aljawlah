import React from 'react';
import { StyledButton } from './Elements';

const Button = (props) => {
  // TODO: do switch statement and return buttons with different sizes
  return (
    <StyledButton color={props.color} type={props.type}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
