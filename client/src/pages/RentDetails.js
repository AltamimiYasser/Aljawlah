import React from 'react';
import moment from 'moment';
import { Divider, Grid, Typography, Container } from '@material-ui/core';
// createdAt: "2021-05-13T00:55:46.792Z"
// customer: {rents: Array(4), bikes: Array(7), _id: "609b8800cc57b2f7a24e9e25", fName: "Yasser", lName: "Tamimi", …}
// endTime: null
// hasEnded: false
// hasStarted: false
// isPaused: true
// lastStartTime: null
// neverPaused: true
// price: 0
// startTime: null
// timeOut: 0
// timerRunning: false
// __v: 0
// _id: "609c7912bb62c9046af354bc"
const RentDetails = ({ rent }) => {
  const {
    createdAt,
    customer,
    hasStarted,
    hasEnded,
    bikes,
    startTime,
    endTime,
  } = rent;
  console.log(rent);
  console.log(createdAt);
  return (
    <Container maxWidth='mid' style={{ marginTop: '5rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant='h6'>Date</Typography>
          <Typography variant='subtitle1'>
            {moment(createdAt).format('DD-MM-YYYY hh:mm')}
          </Typography>
          <Divider style={{ marginBottom: '3rem' }} />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={12}>
          <Typography variant='h6'>Customer Name</Typography>
          <Typography variant='subtitle1'>
            {`${customer.fName} ${customer.lName}`}
          </Typography>
          <Divider style={{ marginBottom: '3rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>Number of Bikes</Typography>
          <Typography variant='subtitle1'>{bikes.length}</Typography>
          <Divider style={{ marginBottom: '3rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>Phone Number</Typography>
          <Typography variant='subtitle1'>{customer.phone}</Typography>
          <Divider style={{ marginBottom: '3rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>Status</Typography>
          <Typography variant='subtitle1'>
            {!hasStarted && `Ready to go`}
            {hasStarted && !hasEnded && (
              <>`Started At ${moment(createdAt).format('hh:mm')}`</>
            )}
            {hasEnded && (
              <>
                Started at{' '}
                <strong> {moment(startTime).format('hh:mm')} </strong> and ended
                at <strong>{moment(endTime).format('hh:mm')} </strong>
              </>
            )}
          </Typography>
          <Divider style={{ marginBottom: '3rem' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RentDetails;
