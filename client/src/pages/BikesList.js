import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/themeContext';
import axios from 'axios';
import MaterielTable from 'material-table';
import { Link, useHistory } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const BikesList = () => {
  //
  const confirm = useConfirm();
  const history = useHistory();
  const [bikes, setBikes] = useState([]);
  const classes = useStyles();

  const { changeTheme } = useContext(ThemeContext);
  useEffect(() => {
    if (changeTheme) changeTheme('light');
  }, [changeTheme]);

  useEffect(() => {
    axios
      .get('/api/bikes')
      .then((res) => {
        setBikes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [bikes]);

  const columns = [
    { title: 'Class', field: 'bikeClass' },
    { title: 'Color', field: 'color' },
    { title: 'Barcode', field: 'barcode' },
    { title: 'Bill Number', field: 'billNumber' },
    { title: 'Date of Purchase', field: 'dateOfPurchase' },
    { title: 'Model', field: 'model' },
    { title: 'Plate', field: 'plate' },
    { title: 'Rent Price', field: 'rentPrice' },
    { title: 'Size', field: 'size' },
    { title: 'Wheels', field: 'wheels' },
    { title: 'Working Hours', field: 'workingHours' },
  ];

  const editBike = (e, data) => {
    history.push(`/bikes/edit/${data._id}`);
  };

  const deleteBike = (e, data) => {
    // delete the bike here
    confirm({
      description: 'Are you sure you want to delete',
      confirmationText: 'Delete',
      confirmationButtonProps: {
        className: classes.button,
        variant: 'contained',
        color: 'secondary',
        startIcon: <DeleteIcon />,
      },
    }).then(() => {
      // call delete bike by id
      console.log(data._id);
      console.log('Agreed');
    });
  };

  return (
    <>
      <Link to={'/bikes/new'}>
        <h5>Add</h5>
      </Link>
      <MaterielTable
        columns={columns}
        data={bikes}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: editBike,
          },
          {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: deleteBike,
          },
        ]}
        title='Bikes List'
      />
    </>
  );
};

export default BikesList;
