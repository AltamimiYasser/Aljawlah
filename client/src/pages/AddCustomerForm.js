import React from 'react';
import axios from 'axios';
import notify from '../utils/notifications';
import { useHistory, useLocation } from 'react-router-dom';
import CustomersForm from '../components/CustomersForm';

const AddCustomerForm = (props) => {
  const history = useHistory();

  // configure if we are coming from a new rent page
  const location = useLocation();
  let phoneNumber;
  if (location.state) phoneNumber = location.state[0].phoneNumber;

  const initialValues = {
    fName: '', // info - TextFiled DONE
    lName: '', // specification - TextFiled DONE
    phone: phoneNumber || '', // specification - number? options DONE
    idNumber: '', // info - TextFiled DONE
    sex: '', // info - Date picker DONE
  };
  const handelSubmit = async (values) => {
    try {
      const res = await axios.post('/api/customers', {
        ...values,
      });

      if (res.status === 200) {
        notify('Saved', 'Customer Added successfully', 'success');
        // TODO: redirect
        if (!phoneNumber) {
          history.push('/customers');
        } else {
          history.push('/rents/choosebike', [{ customer: res.data }]);
        }
      }
    } catch (err) {
      const error = err.response.data.errors[0].msg || 'Unknown Error';
      notify('Error', error, 'danger');
    }
  };

  return (
    <CustomersForm onSubmit={handelSubmit} initialValues={initialValues} />
  );
};

export default AddCustomerForm;
