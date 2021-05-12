import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, CircularProgress, makeStyles } from '@material-ui/core';

import RentDetailsBikesList from './RentDetailsBikesList';
import axios from 'axios';

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

const RentDetails = () => {
  // rent id from params
  const { id } = useParams();
  // state
  const [selectedTab, setSelectedTab] = useState(0);

  // state for rent
  const [loading, setLoading] = useState(true);
  const [rent, setRent] = useState({});

  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    const loadBikes = async () => {
      try {
        const res = await axios.get(`/api/rents/${id}`);
        setLoading(false);
        setRent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadBikes();
  }, [id]);

  const handleChangeTab = (event, newTab) => {
    setSelectedTab(newTab);
  };

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
        <Tab label='Rent' />
        <Tab label='Customer' />
        <Tab label='Bikes' />
      </Tabs>
      {selectedTab === 2 && <RentDetailsBikesList rentBikes={rent.bikes} />}
    </>
  );
};

export default RentDetails;
