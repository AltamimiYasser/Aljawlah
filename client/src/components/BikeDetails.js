import { useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Divider } from '@material-ui/core';
import moment from 'moment';

const BikeDetails = () => {
  const location = useLocation();
  // location.state[0].bike
  const bike = location.state[0].bike;
  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ margin: '2rem 0' }}>
          <Typography variant='h4'>General Info</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            Model
          </Typography>
          <Typography variant='subtitle1'>{bike.model}</Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            Rent Price
          </Typography>
          <Typography variant='subtitle1'>{bike.rentPrice}</Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            Plate
          </Typography>
          <Typography variant='subtitle1'>{bike.plate}</Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            Total Working Hours
          </Typography>
          <Typography variant='subtitle1'>
            {/* render: (rowData) => {
        const time = new Date(rowData.workingHours * 1000)
          .toISOString()
          .substr(11, 8);
        return <>{time}</>;
      }, */}
            {bike.workingHours ? (
              <>
                <strong>
                  {new Date(bike.workingHours * 1000)
                    .toISOString()
                    .substr(11, 8)}{' '}
                </strong>
                hours
              </>
            ) : (
              '-'
            )}
          </Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            Bill Number
          </Typography>
          <Typography variant='subtitle1'>{bike.billNumber}</Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            Purchase Date
          </Typography>
          <Typography variant='subtitle1'>
            {bike.dateOfPurchase
              ? moment(bike.dateOfPurchase).format('DD-MM-YYYY')
              : '-'}
          </Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' color='textSecondary'>
            Barcode
          </Typography>
          <Typography variant='subtitle1'>{bike.barcode}</Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={12} style={{ margin: '2rem 0' }}>
          <Typography variant='h4'>Specifications</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            Color
          </Typography>
          <Typography variant='subtitle1'>{bike.color}</Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            size
          </Typography>
          <Typography variant='subtitle1'>{bike.size}</Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            Wheels
          </Typography>
          <Typography variant='subtitle1'>{bike.wheels}</Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='textSecondary'>
            Class
          </Typography>
          <Typography variant='subtitle1'>{bike.bikeClass}</Typography>
          <Divider style={{ marginBottom: '1rem' }} />
        </Grid>
        <Grid item xs={12} style={{ margin: '2rem 0' }}>
          <Typography variant='h4'>Description</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle2'>
            {bike.description ? bike.description : '-'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BikeDetails;
// "workingHours":60167,
// ,"description":""
// ,"createdAt":"2021-05-12T07:46:35.870Z"
