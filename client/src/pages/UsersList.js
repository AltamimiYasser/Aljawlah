import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import ThemeContext from '../context/themeContext';
import axios from 'axios';
import MaterielTable from 'material-table';
import { useConfirm } from 'material-ui-confirm';
import { makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import notify from '../utils/notifications';

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

const Users = () => {
  //

  const history = useHistory();

  const styles = {
    largeIcon: {
      width: 40,
      height: 40,
      fill: '#38aa38',
    },
  };
  const confirm = useConfirm();
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const { changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (changeTheme) changeTheme('light');
  }, [changeTheme]);

  useEffect(() => {
    axios
      .get('/api/auth/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        // TODO: add notifications
        console.log(err);
      });
  }, []);

  const columns = [
    { title: 'Username', field: 'username' },
    {
      title: 'Created on',
      field: 'created',
      render: (rowData) => (
        <div>{moment(rowData.created).format('DD-MM-YYYY')}</div>
      ),
    },
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

  const deleteUser = (e, data) => {
    confirm({
      description: 'Are you sure you want to delete this user?',
      confirmationText: 'Delete',
      confirmationButtonProps: {
        className: classes.button,
        variant: 'contained',
        color: 'secondary',
        startIcon: <DeleteIcon />,
      },
    }).then(async () => {
      try {
        await axios.delete(`/api/auth/users/${data._id}`);

        axios
          .get('/api/auth/users')
          .then((res) => {
            setUsers(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            // TODO: add notifications
            console.log(err);
          });
      } catch (err) {
        // TODO: makes suer error message works
        notify('Error', err.message, 'danger');
      }
    });
  };

  const redirectToNew = () => {
    history.push('/register');
  };

  return (
    <>
      <MaterielTable
        columns={columns}
        data={users}
        actions={[
          {
            icon: DeleteIcon,
            tooltip: 'Delete',
            onClick: deleteUser,
          },
          {
            icon: () => <AddBox style={styles.largeIcon} />,
            tooltip: 'Add',
            position: 'toolbar',
            onClick: redirectToNew,
          },
        ]}
        title='Users List'
        icons={tableIcons}
      />
    </>
  );
};

export default Users;
