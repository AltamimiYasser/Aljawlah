import axios from 'axios';
import React from 'react';
import BikesForm from '../components/BikesForm';
import notify from '../utils/notifications';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const AddBikeForm = () => {
  const history = useHistory();

  const initialValues = {
    barcode: '', // info - TextFiled DONE
    color: '', // specification - TextFiled DONE
    wheels: 2, // specification - number? options DONE
    billNumber: '', // info - TextFiled DONE
    dateOfPurchase: '', // info - Date picker DONE
    model: '', // info - TextFiled DONE
    rentPrice: 10, // info - Number?
    size: 26, // specification - number? options DONE
    plate: '', // info - TextFiled DONE
    bikeClass: '', // specification -Options DONE
    description: '', // text area DONE
  };
  const handelSubmit = async (values) => {
    try {
      let formattedDateOfPurchase = moment(values.dateOfPurchase).format(
        'YYYY-MM-DD'
      );
      if (
        formattedDateOfPurchase === 'Invalid date' ||
        formattedDateOfPurchase === null
      )
        formattedDateOfPurchase = '';
      const res = await axios.post('/api/bikes', {
        ...values,
        dateOfPurchase: formattedDateOfPurchase,
      });

      if (res.status === 200) {
        notify('Saved', 'Bike Added successfully', 'success');
        // TODO: redirect
        history.push('/bikes');
      }
    } catch (err) {
      const error = err.response.data.errors[0].msg || 'Unknown Error';
      notify('Error', error, 'danger');
    }
  };

  return <BikesForm onSubmit={handelSubmit} initialValues={initialValues} />;
};

export default AddBikeForm;
