import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/themeContext';
import axios from 'axios';
import MaterielTable from 'material-table';
import { Link, useHistory } from 'react-router-dom';

const BikesList = () => {
  const history = useHistory();
  const [bikes, setBikes] = useState([]);

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
