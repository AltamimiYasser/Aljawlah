import React from 'react';
import { Formik } from 'formik';
import FormControl from './FormControl';
import { FormWrapper, Title, FormFields } from './Elements';
import Button from '../button';
import { colors } from '../../utils/styles';

const Form = (props) => {
  // form
  const initialValues = props.initialValues;
  const validationSchema = props.validationSchema;
  const handelSubmit = props.handelSubmit;
  const title = props.title;
  const fields = props.fields;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handelSubmit}>
      {(props) => (
        <FormWrapper>
          <Title>{title}</Title>
          <FormFields>
            {fields &&
              fields.map((field, index) => (
                <FormControl
                  key={index}
                  control={field.control}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  autoComplete='off'
                />
              ))}
            <Button
              type='submit'
              color={colors.CALL_TO_ACTION}
              disabled={!props.isValid}>
              Submit
            </Button>
          </FormFields>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Form;
