import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BikesForm from '../components/BikesForm';
import notify from '../utils/notifications';
import { useHistory } from 'react-router-dom';

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
      const res = await axios.post('/api/bikes', values);
      if (res.status === 200) {
        notify('Saved', 'Bike Added successfully', 'success');
        // TODO: redirect
        history.push('/bikes');
      }
    } catch (err) {
      const error = err.response.data.errors[0].msg;
      notify('Error', error, 'danger');
    }
  };

  useEffect(() => {
    axios.get(`/api/bikes/${id}`).then((res) => {
      setInitialValues(res.data);
    });
  }, [id]);

  return (
    <>
      <BikesForm
        enableReinitialize
        onSubmit={handelSubmit}
        initialValues={initialValues}
      />
    </>
  );
};

export default EditBikeForm;
