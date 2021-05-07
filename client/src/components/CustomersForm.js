import { Container, Grid, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import TextField from './materialForm/textField';
import Select from './materialForm/select';
import Button from './materialForm/button';

const CustomersForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    fName: Yup.string().required('Required'),
    lName: Yup.string(),
    phone: Yup.number().required('Required'),
    idNumber: Yup.string(),
    sex: Yup.string(),
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
                  <Typography variant='h5'>Customer Info</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField name='fName' label='First Name' />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='lName' label='Last Name' />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='phone' label='Phone Number' />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='idNumber' label='ID' />
                </Grid>

                <Grid item xs={12}>
                  <Select name='sex' label='Sex' options={['Male', 'Female']} />
                </Grid>
                <Grid item xs={12}>
                  <Button startIcon={<SaveIcon />} Save>
                    Save
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

export default CustomersForm;
