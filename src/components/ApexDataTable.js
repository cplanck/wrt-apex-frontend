import React, { useEffect, useMemo, useRef, useState } from 'react';
import MaterialReactTable from 'material-react-table';
// import { makeData, } from './makeData';
import { useQuery } from '@tanstack/react-query';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      text: {
        primary: '#FFFFFF',
        secondary: '#E99B05',
      },
      background: {
        default: 'rgba(30,31,35,1)',
        paper: '#1E1F23',
        },
    },
  });
  

const ApexDataTable3 = (props) => {
  const columns = useMemo(
    //column definitions...
    () => [
        {
        accessorKey: 'gps_hhmmss',
        header: 'HHMMSS',
        },
        {
        accessorKey: 'latitude',
        header: 'Latitude',
        },
        {
        accessorKey: 'longitude',
        header: 'Latitude',
        },
    ],
    [],
    //end
  );

  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef = useRef(null);

//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [sorting, setSorting] = useState([]);




//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setData(makeData(10_000));
//       setIsLoading(false);
//     }
//   }, []);

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });


  const { data, isError, isFetching, isLoading, refetch } = useQuery(['table-data' + '_' + String(props.apexID), columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting],
  async () => {
    const url = new URL(
      '/api/apex/frontend/rawdata/?deployment=' + props.apexID,
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:8000'
        : 'http://localhost:8000',
    );
    url.searchParams.set(
      'start',
      `${pagination.pageIndex * pagination.pageSize}`,
    );

    url.searchParams.set('size', `${pagination.pageSize}`);
    url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
    url.searchParams.set('globalFilter', globalFilter ?? '');
    url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

  console.log(url)
    const response = await fetch(url.href);
    const json = await response.json();
    return json;
  },
  { keepPreviousData: true },
);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    rowVirtualizerInstanceRef.current?.scrollToIndex(0);
  }, [sorting]);

  return (
    <ThemeProvider theme={createTheme(darkTheme)}>
    <MaterialReactTable
      columns={columns}
      data={data?? []}
      enableBottomToolbar={false}
      enableColumnVirtualization
      enableGlobalFilterModes
      enablePagination={false}
      enableRowVirtualization
      muiTableContainerProps={{ sx: { maxHeight: '420px' } }}
      onSortingChange={setSorting}
      state={{ isLoading, sorting }}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //optional
      rowVirtualizerProps={{ overscan: 5 }} //optionally customize the row virtualizer
      columnVirtualizerProps={{ overscan: 2 }} //optionally customize the column virtualizer
    /></ThemeProvider>
  );
};

export default ApexDataTable3;
