import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomersForm from '../components/CustomersForm';
import notify from '../utils/notifications';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const EditBikeForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    fName: '', // info - TextFiled DONE
    lName: '', // specification - TextFiled DONE
    phone: '', // specification - number? options DONE
    idNumber: '', // info - TextFiled DONE
    sex: '', // info - Date picker DONE
  });

  const handelSubmit = async (values) => {
    try {
      const res = await axios.put(`/api/customers/${id}`, values);
      if (res.status === 200) {
        notify('Saved', 'Customer updated successfully', 'success');
        history.push('/customers');
      }
    } catch (err) {
      const error = err.response.data.errors[0].msg;
      notify('Error', error, 'danger');
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const loadData = async () => {
      const res = await axios.get(`/api/customers/${id}`);
      const { fName, lName, phone, idNumber, sex } = res.data;

      if (isMounted)
        setInitialValues({
          fName,
          lName,
          phone,
          idNumber,
          sex,
        });
    };
    loadData();
    setLoading(false);

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return (
    <>
      <CustomersForm onSubmit={handelSubmit} initialValues={initialValues} />
    </>
  );
};

export default EditBikeForm;
