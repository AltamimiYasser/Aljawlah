import React from 'react';
import { useParams } from 'react-router-dom';

const EditBikeForm = () => {
  const { id } = useParams();
  console.log(id);
  return <div></div>;
};

export default EditBikeForm;
