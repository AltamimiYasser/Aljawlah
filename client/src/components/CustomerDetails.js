import {
  makeStyles,
  CircularProgress,
  Divider,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BikesList from '../components/BikesList';
import RentList from '../components/RentsList';
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

const CustomerDetails = ({ customer }) => {
  const bikesIds = customer.bikes;
  const rentsIds = customer.rents;

  const classes = useStyles();
  // state
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [rents, setRents] = useState([]);

  console.log('rents', rents);

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
        if (err.response.data && err.response.data.errors)
          error = err.response.data.errors[0].msg;
        notify('Error', error, 'danger');
      }
    };
    loadBikes();
  }, [bikesIds]);

  // use effect to get bikes
  useEffect(() => {
    setLoading(true);
    const loadRents = async () => {
      try {
        const res = await axios.post('/api/rents/group', { ids: rentsIds });
        setRents(res.data);
        setLoading(false);
      } catch (err) {
        let error = 'Unknown Error';
        if (err.response.data.errors) error = err.response.data.errors[0].msg;
        notify('Error', error, 'danger');
      }
    };
    loadRents();
  }, [rentsIds]); // useEffect to get rents

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return (
    <TopContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Name
          </Typography>
          <Typography
            variant='subtitle1'
            gutterBottom>{`${customer.fName} ${customer.lName}`}</Typography>
          <Divider style={{ marginBottom: '3rem' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Phone Number
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {customer.phone}
          </Typography>
          <Divider style={{ marginBottom: '3rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' gutterBottom>
            ID Number
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {customer.idNumber}
          </Typography>
          <Divider style={{ marginBottom: '3rem' }} />
        </Grid>

        <Grid item xs={6}>
          <Typography variant='h6' gutterBottom>
            Sex
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {customer.sex}
          </Typography>
          <Divider style={{ marginBottom: '3rem' }} />
        </Grid>
      </Grid>
      <div className='divider' />
      <BikesList
        bikes={bikes}
        title='Bikes customer rented before'
        className='table'
      />
      <div className='divider' />
      <RentList rents={rents} title='Customer Rents' className='table' />
    </TopContainer>
  );
};

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 5rem 0;
  padding: 5px;
  .divider {
    height: 3rem;
  }
`;

export default CustomerDetails;
