import React, { forwardRef } from 'react';
import MaterielTable from 'material-table';
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

const BikesList = ({ bikes, title }) => {
  //

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
    {
      title: 'Working Hours',
      field: 'workingHours',
      render: (rowData) => {
        const time = new Date(rowData.workingHours * 1000)
          .toISOString()
          .substr(11, 8);
        return <>{time}</>;
      },
    },
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

  return (
    <>
      <MaterielTable
        columns={columns}
        data={bikes}
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
      />
    </>
  );
};

export default BikesList;
