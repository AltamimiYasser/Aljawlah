import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useFormikContext } from 'formik';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '1.4rem',
  },
}));

const SubmitButton = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const classes = useStyles();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    type: 'submit',
    fullWidth: true,
    color: 'primary',
    variant: 'contained',
    onClick: handleSubmit,
    className: classes.button,
    ...otherProps,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default SubmitButton;
