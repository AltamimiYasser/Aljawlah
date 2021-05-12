import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CustomerDetails from '../components/CustomerDetails';
import notify from '../utils/notifications';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const CustomerDetailsPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({});

  const classes = useStyles();

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/customers/${id}`);
        setCustomer(res.data);
        setLoading(false);
      } catch (err) {
        let error = 'Unknown Error';
        if (err.response.data && err.response.data.errors)
          error = err.response.data.errors[0].msg;
        notify('Error', error, 'danger');
      }
    };
    loadCustomer();
  }, [id]);

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return <CustomerDetails customer={customer} />;
};

export default CustomerDetailsPage;
