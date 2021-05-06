import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/themeContext';
import axios from 'axios';
import MaterielTable from 'material-table';
import { Link } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import notify from '../utils/notifications';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Users = () => {
  //
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
    { title: 'Created on', field: 'created' },
  ];

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

  return (
    <>
      <Link to={'/register'}>
        <h5>Add User</h5>
      </Link>
      <MaterielTable
        columns={columns}
        data={users}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: deleteUser,
          },
        ]}
        title='Bikes List'
      />
    </>
  );
};

export default Users;
