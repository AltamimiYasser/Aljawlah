import { Container, Grid, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import TextField from './textField';
import Button from './button';

const RentPhoneForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    phoneNumber: Yup.number().required('Required'),
  });

  return (
    <Grid container align='center' justify='center' alignItems='center'>
      <Grid item xs={12}>
        <Container maxWidth='md'>
          <Formik
            enableReinitialize
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h5'>Customer Phone</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField name='phoneNumber' label='Phone Number' required />
                </Grid>
                <Grid item xs={12}>
                  <Button startIcon={<CheckIcon />} Save>
                    Check
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default RentPhoneForm;
