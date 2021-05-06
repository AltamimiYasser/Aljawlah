import { Container, Grid, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import TextField from './materialForm/textField';
import Select from './materialForm/select';
import DateTimePicker from './materialForm/dateTimePicker';
import Button from './materialForm/button';

const BikesForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    barcode: Yup.string(),
    color: Yup.string().required('Required'),
    wheels: Yup.number().required('Required'),
    billNumber: Yup.string(),
    dateOfPurchase: Yup.date(),
    model: Yup.string(),
    rentPrice: Yup.number(),
    size: Yup.number().required('Required'),
    plate: Yup.string(),
    bikeClass: Yup.string(),
    description: Yup.string(),
  });

  const handelSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Grid container align='center' justify='center' alignItems='center'>
      <Grid item xs={12}>
        <Container maxWidth='md'>
          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={handelSubmit}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h5'>General Info</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField name='barcode' label='Barcode' />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='billNumber' label='Bill Number' />
                </Grid>
                <Grid item xs={6}>
                  <TextField name='model' label='Model' />
                </Grid>
                <Grid item xs={6}>
                  <TextField name='plate' label='Plate' />
                </Grid>
                <Grid item xs={12}>
                  <DateTimePicker
                    name='dateOfPurchase'
                    label='Date of Purchase'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5'>Specification</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField name='color' label='Color' />
                </Grid>
                <Grid item xs={6}>
                  <Select name='wheels' label='Wheels' options={[2, 3, 4]} />
                </Grid>

                <Grid item xs={6}>
                  <TextField name='size' label='Size' type='number' />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    name='bikeClass'
                    label='Class'
                    options={['Sport', 'Children', 'Electronic', 'Hyper']}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5'>Description</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name='description'
                    label='Description'
                    multiline={true}
                    rows={6}
                  />
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

export default BikesForm;
