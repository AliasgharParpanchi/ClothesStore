import React, { useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../redux/apiCalls'


const Container = styled.div`
          width: 99.5%;
          flex: 4;

`;

const User = styled.div`
          display: flex;
          aligen-items: center;
`;
const IMG = styled.img`
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
`;
const UserListButton = styled.button`
          border: none;
          border-radius: 10px;
          padding: 5px 10px;
          background-color: #3bb077;
          color: white;
          cursor: pointer;
          margin-right: 10px;
`;
const DeleteButton = styled.div`
         color: red;
         cursor: pointer;
`;

export default function UserList() {

  const dispatch = useDispatch();
  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])

  const Users = useSelector((state) => state.user.Users)



  const columns = [
    { field: '_id', headerName: 'ID', width: 210 },
    { field: 'userName', headerName: 'نام کاربری', width: 150, direction: 'rtl' },
    { field: 'phone', headerName: 'شماره تلقن', width: 180,  direction: 'rtl' },
    { field: 'email', headerName: 'ایمیل', width: 200,  direction: 'rtl' },
    {
      field: 'Action',
      headerName: 'اقدام',
      width: 110,
      renderCell : (params)=>{
        return(
            <>
              <Link to={'/user/' + params.row._id}>
               <UserListButton>ویرایش</UserListButton>
              </Link>
            </>
        )
      }
    }
  ];
  

    return (
      <Container>
       <DataGrid
        rows={Users}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
      />
      </Container>
    )
  }