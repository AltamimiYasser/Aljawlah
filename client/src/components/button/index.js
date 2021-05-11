import React from 'react';
import { StyledButton } from './Elements';

const Button = (props) => {
  return (
    <StyledButton
      color={props.color}
      type={props.type}
      disabled={props.disabled}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
