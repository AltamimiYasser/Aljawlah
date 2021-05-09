import React, { useContext, useEffect, useState, forwardRef } from 'react';
import ThemeContext from '../context/themeContext';
import axios from 'axios';
import MaterielTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import notify from '../utils/notifications';
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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const styles = {
  largeIcon: {
    width: 40,
    height: 40,
    fill: '#38aa38',
  },
};

const RentsList = () => {
  //
  const confirm = useConfirm();
  const history = useHistory();
  const [rents, setRents] = useState([]);
  const classes = useStyles();
  const { changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (changeTheme) changeTheme('light');
  }, [changeTheme]);

  useEffect(() => {
    axios
      .get('/api/rents')
      .then((res) => {
        setRents(res.data);
      })
      .catch((err) => {
        // TODO: add notification
        console.error(err);
      });
  }, []);

  const columns = [{ title: 'Customer', field: 'customer' }];

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

  // confirm then delete a rent
  const deleteRent = (e, data) => {
    // delete the bike here
    confirm({
      description: 'Are you sure you want to delete this rent?',
      confirmationText: 'Delete',
      confirmationButtonProps: {
        className: classes.button,
        variant: 'contained',
        color: 'secondary',
        startIcon: <DeleteIcon />,
      },
    }).then(async () => {
      try {
        await axios.delete(`/api/rents/${data._id}`);

        axios
          .get('/api/customers')
          .then((res) => {
            setRents(res.data);
          })
          .catch((err) => {
            // TODO: add notification
            console.error(err);
          });
      } catch (err) {
        // TODO: makes suer error message works
        notify('Error', err.message, 'danger');
      }
      // call delete bike by id
    });
  };

  const redirectToNew = () => {
    history.push('/rents/new');
  };

  return (
    <>
      <MaterielTable
        columns={columns}
        data={rents}
        actions={[
          {
            icon: () => <DeleteIcon color='secondary' />,
            tooltip: 'Delete',
            onClick: deleteRent,
          },
          {
            icon: () => <AddBox style={styles.largeIcon} />,
            tooltip: 'Add',
            position: 'toolbar',
            onClick: redirectToNew,
          },
        ]}
        title='Rents List'
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: colors.PRIMARY.bg,
            color: '#fff',
            fontSize: '1rem',
          },
        }}
        icons={tableIcons}
      />
    </>
  );
};

export default RentsList;
