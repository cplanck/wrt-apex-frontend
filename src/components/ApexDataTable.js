import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { createTheme } from '@mui/material/styles';

import { useQuery } from '@tanstack/react-query';
import { ThemeContext, ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      text: {
        primary: '#ffffff',
        secondary: '#ffffff',
      },
    },
  });

const ApexDataTable2 = (props) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isError, isFetching, isLoading, refetch } = useQuery(['table-data', columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting],
    async () => {
      const url = new URL(
        '/api/apex/frontend/rawdata/?deployment=' + props.apexID,
        process.env.NODE_ENV === 'production'
          ? 'https://www.material-react-table.com'
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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'gps_hhmmss',
        header: 'Timestamp',
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
  );

  return (
    <ThemeProvider theme={createTheme(darkTheme)}>
        <MaterialReactTable
            columns={columns}
            data={data ?? []} //data is undefined on first render
            initialState={{ showColumnFilters: false }}
            // manualFiltering
            // manualPagination
            // manualSorting
            muiToolbarAlertBannerProps={
                isError
                ? {
                    color: 'error',
                    children: 'Error loading data',
                    }
                : undefined
            }
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={setGlobalFilter}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            renderTopToolbarCustomActions={() => (
                <Tooltip arrow title="Refresh Data">
                    <IconButton onClick={() => refetch()}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            )}
            rowCount={121 ?? 0}
            state={{
                columnFilters,
                globalFilter,
                isLoading,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isFetching,
                sorting,
            }}
    /></ThemeProvider>
  );
};

export default ApexDataTable2;
