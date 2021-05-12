import React, { forwardRef } from 'react';
import MaterielTable from 'material-table';
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
import Timer from './Timer';
import { useHistory } from 'react-router';

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

const MainRentsList = ({ rents, title }) => {
  //
  const history = useHistory();
  const columns = [
    {
      title: 'Date',
      field: 'createdAt',
      render: ({ date }) => {
        return <>{moment(date).format('DD-MM-YYYY hh:mm')}</>;
      },
    },
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

  const handelRowClick = (e, rowData) => {
    //TODO: here go to details page
    const id = rowData.id;
    history.push(`/rents/${id}`);
  };

  return (
    <>
      <MaterielTable
        columns={columns}
        data={rents}
        title={title}
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

export default MainRentsList;
