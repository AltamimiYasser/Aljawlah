import React from 'react';
import BikesList from '../components/BikesList';

const RentDetailsBikesList = ({ bikes }) => {
  return (
    <div>
      <BikesList bikes={bikes} title='Rent Bikes' />
    </div>
  );
};

export default RentDetailsBikesList;
