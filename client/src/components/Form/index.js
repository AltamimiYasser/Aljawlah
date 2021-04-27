import React from 'react';
import { Formik } from 'formik';
import FormControl from './FormControl';
import { FormWrapper, Title, FormFields, Button } from './Elements';

const Form = (props) => {
  // form
  const initialValues = props.initialValues;
  const validationSchema = props.validationSchema;
  const handelSubmit = props.handelSubmit;
  const title = props.title;
  const fields = props.fields;
  console.log(props);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handelSubmit}>
      {(formik) => (
        <FormWrapper>
          <Title>{title}</Title>
          <FormFields>
            {console.log('fields', props.fields)}
            {fields &&
              fields.map((field, index) => (
                <FormControl
                  control={field.control}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  autocomplete='off'
                />
              ))}
            <Button type='submit'>Submit</Button>
          </FormFields>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Form;
