import React, { useContext, useEffect, useState, forwardRef } from 'react';
import ThemeContext from '../context/themeContext';
import axios from 'axios';
import MaterielTable from 'material-table';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { colors } from '../utils/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import CircularProgress from '@material-ui/core/CircularProgress';
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

const styles = {
  largeIcon: {
    width: 40,
    height: 40,
    fill: '#38aa38',
  },
};

const RentChooseBikeForm = () => {
  //
  const history = useHistory();
  const location = useLocation();
  let customerId;
  if (location.state) customerId = location.state[0].customer._id;

  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [selectedBikes, setSelectedBikes] = useState([]);

  const classes = useStyles();
  const { changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (changeTheme) changeTheme('light');
  }, [changeTheme]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/bikes')
      .then((res) => {
        setBikes(res.data.filter((bike) => !bike.isOut));
        setLoading(false);
      })
      .catch((err) => {
        // TODO: add notification
        console.error(err);
      });
  }, []);

  const columns = [
    { title: 'Class', field: 'bikeClass' },
    { title: 'Color', field: 'color' },
    { title: 'Barcode', field: 'barcode' },
    { title: 'Bill Number', field: 'billNumber' },
    {
      title: 'Date of Purchase',
      field: 'dateOfPurchase',
      render: (rowData) => {
        if (!rowData.dateOfPurchase) return <div></div>;
        return <div>{moment(rowData.dateOfPurchase).format('DD-MM-YYYY')}</div>;
      },
    },
    { title: 'Model', field: 'model' },
    { title: 'Plate', field: 'plate' },
    { title: 'Rent Price', field: 'rentPrice' },
    { title: 'Size', field: 'size' },
    { title: 'Wheels', field: 'wheels' },
    { title: 'Working Hours', field: 'workingHours' },
    { title: 'Out', field: 'isOut' },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const handelSelection = (selected) => {
    const newState = selected
      .filter((row) => row.tableData.checked)
      .map((row) => row._id);
    setSelectedBikes(newState);
  };

  const handelSubmit = async (e, data) => {
    setLoading(true);
    try {
      await axios.post('/api/rents', {
        customer: customerId,
        bikes: selectedBikes,
      });
      notify('Success', 'Rent Saved Successfully', 'success');
      setLoading(false);

      // then reload the data

      setLoading(true);
      const bikes = await axios.get('/api/bikes');
      setBikes(bikes.data.filter((bike) => !bike.isOut));
      setLoading(false);
      history.push('/rents');
    } catch (err) {
      console.err(err);
    }
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
      <MaterielTable
        columns={columns}
        data={bikes}
        title='Select Bikes'
        options={{
          selection: true,
          pageSize: 10,
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: colors.PRIMARY.bg,
            color: '#fff',
            fontSize: '1rem',
          },
        }}
        onSelectionChange={handelSelection}
        icons={tableIcons}
        actions={[
          {
            icon: () => <AddBox style={styles.largeIcon} />,
            tooltip: 'Add',
            onClick: handelSubmit,
            position: 'toolbarOnSelect',
          },
        ]}
      />
    </>
  );
};

export default RentChooseBikeForm;
