import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, CircularProgress, makeStyles } from '@material-ui/core';

import RentDetailsBikesList from './RentDetailsBikesList';
import axios from 'axios';
import notify from '../utils/notifications';
import ThemeContext from '../context/themeContext';
import RentDetails from './RentDetails';
import CustomerDetail from '../components/CustomerDetails';

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

const RentDetailsMainPage = () => {
  // rent id from params
  const { id } = useParams();
  // state
  const [selectedTab, setSelectedTab] = useState(0);

  // state for rent
  const [loading, setLoading] = useState(true);
  const [rent, setRent] = useState({});

  const classes = useStyles();

  const { changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (changeTheme) changeTheme('light');
  }, [changeTheme]);

  useEffect(() => {
    setLoading(true);
    const loadBikes = async () => {
      try {
        const res = await axios.get(`/api/rents/${id}`);
        setLoading(false);
        setRent(res.data);
      } catch (err) {
        let error = 'Unknown Error';
        if (err.response.data.errors) error = err.response.data.errors[0].msg;
        notify('Error', error, 'danger');
      }
    };
    loadBikes();
  }, [id]);

  const handleChangeTab = (event, newTab) => {
    setSelectedTab(newTab);
  };
  console.log(rent._id);

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
      <Tabs
        value={selectedTab}
        onChange={handleChangeTab}
        variant='fullWidth'
        style={{ marginTop: '-30px' }}
        cla>
        <Tab label='Bikes' />
        <Tab label='Customer' />
        <Tab label='Rent' />
      </Tabs>
      {selectedTab === 0 && <RentDetailsBikesList bikes={rent.bikes} />}
      {selectedTab === 1 && <CustomerDetail customer={rent.customer} />}
      {selectedTab === 2 && <RentDetails bikes={rent.bikes} />}
    </>
  );
};

export default RentDetailsMainPage;
