import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BikesList from '../components/BikesList';
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

const RentCustomerDetailsPage = ({ rentCustomer }) => {
  const bikesIds = rentCustomer.bikes;
  const classes = useStyles();

  // state
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [rents, setRents] = useState([]);

  // use effect to get bikes
  useEffect(() => {
    setLoading(true);
    const loadBikes = async () => {
      try {
        const res = await axios.post('/api/bikes/group', { ids: bikesIds });
        setBikes(res.data);
        setLoading(false);
      } catch (err) {
        let error = 'Unknown Error';
        if (err.response.data.errors) error = err.response.data.errors[0].msg;
        notify('Error', error, 'danger');
      }
    };
    loadBikes();
  }, [bikesIds]);
  // useEffect to get rents

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return <BikesList bikes={bikes} title='Customer Rented Before' />;
};

export default RentCustomerDetailsPage;

// get bikes group and pass them to the bikesList
// use Material-ui to display the page and put the bikes list
// before last
// also display a list of rents of the users at the very end
