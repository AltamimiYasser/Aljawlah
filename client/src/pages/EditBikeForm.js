import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BikesForm from '../components/BikesForm';
import notify from '../utils/notifications';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const EditBikeForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState({
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
    description: '',
  });

  const handelSubmit = async (values) => {
    try {
      const res = await axios.put(`/api/bikes/${id}`, values);
      if (res.status === 200) {
        notify('Saved', 'Bike updated successfully', 'success');
        history.push('/bikes');
      }
    } catch (err) {
      const error = err.response.data.errors[0].msg;
      notify('Error', error, 'danger');
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      const res = await axios.get(`/api/bikes/${id}`);
      const {
        barcode,
        color,
        wheels,
        billNumber,
        dateOfPurchase,
        model,
        rentPrice,
        size,
        plate,
        bikeClass,
        description,
      } = res.data;

      let formattedDateOfPurchase = moment(dateOfPurchase).format('YYYY-MM-DD');
      if (formattedDateOfPurchase === 'Invalid date')
        formattedDateOfPurchase = '';

      if (isMounted)
        setInitialValues({
          barcode,
          color,
          wheels,
          billNumber,
          dateOfPurchase: formattedDateOfPurchase,
          model,
          rentPrice,
          size,
          plate,
          bikeClass,
          description,
        });
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);
  useEffect(() => async () => {}, [id]);

  return (
    <>
      <BikesForm onSubmit={handelSubmit} initialValues={initialValues} />
    </>
  );
};

export default EditBikeForm;
