import axios from 'axios';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const RentChooseBikeForm = () => {
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = async (bikesIds) => {
    // use the user id passed from the new User Creation
    try {
      const customer = location.state.customerId;
      const bikes = [...bikesIds];
      const res = await axios.post('/api/rents', { customer, bikes });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return <div></div>;
};

export default RentChooseBikeForm;
