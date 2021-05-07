import axios from 'axios';
import React from 'react';
import notify from '../utils/notifications';
import { useHistory } from 'react-router-dom';
import CustomersForm from '../components/CustomersForm';

const AddCustomerForm = () => {
  const history = useHistory();

  const initialValues = {
    fName: '', // info - TextFiled DONE
    lName: '', // specification - TextFiled DONE
    phone: '', // specification - number? options DONE
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
        history.push('/customers');
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
