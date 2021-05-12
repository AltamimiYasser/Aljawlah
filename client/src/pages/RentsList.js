import React, { useContext, useEffect, useState, forwardRef } from 'react';
import ThemeContext from '../context/themeContext';
import axios from 'axios';
import MaterielTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import notify from '../utils/notifications';
import { colors } from '../utils/styles';
import moment from 'moment';

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
import PlayCircleFilledSharpIcon from '@material-ui/icons/PlayCircleFilledSharp';
import PauseCircleFilledSharpIcon from '@material-ui/icons/PauseCircleFilledSharp';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Timer from '../components/Timer';

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
  playIcon: {
    width: 30,
    height: 30,
    fill: '#38aa38',
  },
  pauseIcon: {
    width: 30,
    height: 30,
    fill: '#ff8000',
  },
  resumeIcon: {
    width: 30,
    height: 30,
    fill: '#ff8000',
  },
  stopIcon: {
    width: 30,
    height: 30,
    fill: '#ff4000',
  },
  detailsIcon: {
    width: 30,
    height: 30,
    fill: '#2550ee',
  },
};

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
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const calcTimeDiffInSeconds = (start, end) => {
  let difference = (end.getTime() - start.getTime()) / 1000;
  difference = Math.abs(Math.round(difference));
  return difference;
};

const RentsList = () => {
  //
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [rents, setRents] = useState([]);

  const classes = useStyles();
  const { changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (changeTheme) changeTheme('light');
  }, [changeTheme]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/rents')
      .then((res) => {
        setRents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        let error = 'Unknown Error';
        if (err.response.data.errors) error = err.response.data.errors[0].msg;
        notify('Error', error, 'danger');
      });
  }, []);

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Phone', field: 'phone' },
    {
      title: 'Bikes',
      field: 'bikes',
      render: ({ bikes }) => {
        const sizes = bikes.map((bike) => bike.size);
        const combined = sizes.join(', ');
        return <>{combined}</>;
      },
    },
    {
      title: 'Start Time',
      field: 'startTime',
      render: ({ startTime }) => {
        if (!startTime) return <>-</>;
        return <>{moment(startTime).format('hh:mm')}</>;
      },
    },
    {
      title: 'End Time',
      field: 'endTime',
      render: ({ endTime }) => {
        if (!endTime) return <>-</>;
        return <>{moment(endTime).format('hh:mm')}</>;
      },
    },
    {
      title: 'Price',
      field: 'price',
    },
    // { title: 'hasStarted', field: 'hasStarted' },
    // { title: 'neverPaused', field: 'neverPaused' },
    {
      title: 'Last Start Time',
      field: 'lastStartTime',
      render: ({ lastStartTime }) => {
        if (!lastStartTime) return <>-</>;
        return <>{moment(lastStartTime).format('hh:mm')}</>;
      },
    },
    {
      title: 'Time',
      render: (rowData) => {
        // let startTime = 0;
        let startTime = rowData.timeOut;
        if (rowData.hasStarted && rowData.neverPaused) {
          const now = new Date();
          const start = moment(rowData.lastStartTime).toDate();
          startTime = calcTimeDiffInSeconds(start, now);
        }

        return (
          <Timer
            isActive={rowData.timerRunning}
            startTimeInSeconds={startTime}
            paused={rowData.isPaused}
            ended={rowData.hasEnded}
            started={rowData.hasStarted}
          />
        );
      },
    },
  ];

  const redirectToNew = () => {
    history.push('/rents/new');
  };

  const loadData = async () => {
    axios
      .get('/api/rents')
      .then((res) => {
        setRents(res.data);
      })
      .catch((err) => {
        let error = 'Unknown Error';
        if (err.response.data.errors) error = err.response.data.errors[0].msg;
        notify('Error', error, 'danger');
      });
  };

  // start timer
  const startRent = async (e, data) => {
    try {
      await axios.put(`/api/rents/${data.id}/start`);
      // start timer
      // load data
      loadData();
    } catch (err) {
      let error = 'Unknown Error';
      if (err.response.data.errors) error = err.response.data.errors[0].msg;
      notify('Error', error, 'danger');
    }
  };

  // pause rent
  const pauseRent = async (e, data) => {
    try {
      await axios.put(`/api/rents/${data.id}/pause`);
      // start timer
      // load data
      loadData();
    } catch (err) {
      let error = 'Unknown Error';
      if (err.response.data.errors) error = err.response.data.errors[0].msg;
      notify('Error', error, 'danger');
    }
  };

  // resume time
  const resumeRent = async (e, data) => {
    try {
      await axios.put(`/api/rents/${data.id}/resume`);
      // start timer
      // load data
      loadData();
    } catch (err) {
      let error = 'Unknown Error';
      if (err.response.data.errors) error = err.response.data.errors[0].msg;
      notify('Error', error, 'danger');
    }
  };

  const disableResumeAction = (rowData) => {
    if (!rowData.hasStarted) {
      return true;
    }

    if (!rowData.hasEnded) {
      if (!rowData.isPaused) {
        return true;
      }
    }
    return false;
  };

  // end time
  const endRent = async (e, data) => {
    try {
      await axios.put(`/api/rents/${data.id}/end`);
      // start timer
      // load data
      loadData();
    } catch (err) {
      let error = 'Unknown Error';
      if (err.response.data.errors) error = err.response.data.errors[0].msg;
      notify('Error', error, 'danger');
    }
  };

  const handelRowClick = (e, rowData) => {
    //TODO: here go to details page
    const id = rowData.id;
    history.push(`/rents/${id}`);
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
        data={rents}
        actions={[
          {
            icon: () => <AddBox style={styles.largeIcon} />,
            tooltip: 'Add',
            position: 'toolbar',
            onClick: redirectToNew,
          },
          // start and pause and stop actions
          (rowData) => ({
            icon: ({ disabled }) => {
              if (!disabled)
                return <PlayCircleFilledSharpIcon style={styles.playIcon} />;
              return <PlayCircleFilledSharpIcon color='disabled' />;
            },
            tooltip: 'Start',
            onClick: startRent,
            disabled: rowData.hasStarted,
          }),

          (rowData) => ({
            icon: ({ disabled }) => {
              if (!disabled)
                return <PauseCircleFilledSharpIcon style={styles.pauseIcon} />;
              return <PauseCircleFilledSharpIcon color='disabled' />;
            },
            tooltip: 'Pause',
            onClick: pauseRent,
            disabled: !rowData.timerRunning,
          }),

          (rowData) => ({
            icon: ({ disabled }) => {
              if (!disabled) return <PlayArrowIcon style={styles.resumeIcon} />;
              return <PlayArrowIcon color='disabled' />;
            },
            tooltip: 'Resume',
            onClick: resumeRent,
            disabled: disableResumeAction(rowData),
          }),
          (rowData) => ({
            icon: ({ disabled }) => {
              if (!disabled) return <StopIcon style={styles.stopIcon} />;
              return <StopIcon color='disabled' />;
            },
            tooltip: 'End',
            onClick: endRent,
            disabled: !rowData.hasStarted || rowData.hasEnded,
          }),
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
        onRowClick={handelRowClick}
      />
    </>
  );
};

export default RentsList;
