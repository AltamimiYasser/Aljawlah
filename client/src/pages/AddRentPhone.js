import axios from 'axios';
import React from 'react';
import RentPhoneForm from '../components/materialForm/RentPhoneForm';
import notify from '../utils/notifications';
import { useHistory } from 'react-router-dom';

const AddRentPhone = () => {
  const history = useHistory();
  // initialValues
  const initialValues = {
    phoneNumber: '',
  };

  // if phone found redirect preview customer details and from there to choose bikes form
  const handelSubmit = async (values) => {
    try {
      const res = await axios.get(
        `/api/customers/byphone/${values.phoneNumber}`
      );

      // res.data {found: true/false, customer: details/null}
      // if we didn't find user by the phone number go to create a user and pass
      // to it the phone
      if (res.data.found) {
        history.push('/rents/choosebike', [{ customer: res.data.customer }]);
      } else {
        history.push('/customers/new', [{ phoneNumber: values.phoneNumber }]);
      }
    } catch (err) {
      const error = err.response.data.errors[0].msg || 'Unknown Error';
      notify('Error', error, 'danger');
    }
  };
  return (
    <RentPhoneForm onSubmit={handelSubmit} initialValues={initialValues} />
  );
};

export default AddRentPhone;
