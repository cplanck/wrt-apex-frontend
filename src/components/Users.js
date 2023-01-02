import React, { useEffect, useMemo, useRef, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { useQuery } from '@tanstack/react-query';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'


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
  

const UserTable = (props) => { 
  const columns = useMemo(
    () => [
        {
        accessorKey: 'first_name',
        header: 'First Name',
        },
        {
        accessorKey: 'last_name',
        header: 'Last Name',
        },
        {
        accessorKey: 'email',
        header: 'Email',
        },
    ],
    [],
    //end
  );

  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef = useRef(null);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });


  const { data, isError, isFetching, isLoading, refetch } = useQuery(['table-data' + '_' + String(props.apexID), columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting],
  async () => {
    let url = process.env.REACT_APP_BACKEND_ROOT + '/api/apex/frontend/list_users/'
    const options = {method: 'GET', headers: {Authorization: 'Token ' + props.userDetails.token}}
    const response = await fetch(url, options);
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
    <div className='userTable'>
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
    </div>
  );
};


function Users(props){
    return(
        <div className='UserTableWrapper'>
            <div className='userHeader'>
                <h1>Users</h1>
                <a className='linkFormat' href={process.env.REACT_APP_BACKEND_ROOT + '/admin/auth/user/add/'}>Add User <FontAwesomeIcon className='ps-2' icon={faCirclePlus} /></a>
            </div>
            <UserTable userDetails={props.userDetails} />
        </div>
    )
}

export default Users;
