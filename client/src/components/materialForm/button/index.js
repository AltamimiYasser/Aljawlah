import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '1.4rem',
  },
}));

const SubmitButton = ({ children, handleSubmit, ...otherProps }) => {
  const classes = useStyles();

  const configButton = {
    type: 'submit',
    fullWidth: true,
    color: 'primary',
    variant: 'contained',
    className: classes.button,
    ...otherProps,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default SubmitButton;
