import React, { useEffect } from 'react';
import Navbar from './AdminNav'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { itemsFetch } from '../redux/admItemsRedux';
import styled from 'styled-components'
import { publicRequest } from '../base_url/urls';
import { useNavigate } from 'react-router-dom';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import { userDelete, usersFetch } from '../redux/admUserRedux';

const wrapper = {
    width:"100%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    marginTop:"20px"
}

const Action = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    button {
        border:none;
        outline:none;
        padding:3px 5px;
        color:white;
        border-radius:3px;
        cursor: pointer;
    }
`
const Delete = styled.button`
    background-color: rgb(255, 77, 73);
`

const View = styled.button`
    background-color: rgb(114, 225, 40);   
`

const Edit = styled.button`
    background-color: rgb(32, 177, 255);   
`
const Create = styled.div`
    width:80%;
    display:flex;
    justify-content:space-evenly;
    margin:10px;
`
const Title = styled.h3`
       
`
const CreateButton = styled.button`
    background-color: rgb(111, 119, 214);  
    border:none;
    color:white; 
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
    }
`
const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`
const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;

`

export default function AdminUsers() {

    const {list} = useSelector(state => state.items)
    // console.log("itemsRedux",list)

    const {userlist} = useSelector(state => state.admUsers)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        dispatch(
            usersFetch({token})
        )
    },[dispatch])

    const handleDelete = async(id) => {
        dispatch(
            userDelete({
              id,token
            })
        )
    }

    const rows = userlist && userlist.map((item) => {
        return {
            id:item._id,
            imageUrl:item.profilePic || 'https://i.postimg.cc/htWDLS6P/user-avatar.png',
            uName:item.username,
            uEmail:item.email,
            isAdmin:item.isAdmin
        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'imageUrl', headerName: 'Image', width: 80,
            renderCell: (params) => {
                return (
                    <div>
                        <img style={{height:"50px",width:"50px",borderRadius:"50%"}} src={params.row.imageUrl} alt="" />
                    </div>
                )
            }
        },
        { field: 'uName', headerName: 'Name', width: 130 },
        {
          field: 'uEmail',
          headerName: 'Email',
          type: 'number',
          width: 90,
        },
        {
          field: 'isAdmin',
          headerName: 'isAdmin',
          description: 'This column has a value getter and is not sortable.',
          sortable: true,
          width: 180,
          renderCell: (params) => {
            return (
                <div>
                  {
                    params.row.isAdmin ? (
                      <Admin>Admin</Admin>
                    ) : (
                      <Customer>Customer</Customer>
                    )
                  }
                </div>  
            )
           }
        },
        {
          field: 'actions',
          headerName: 'Actions',
          description: 'This column has a value getter and is not sortable.',
          sortable: true,
          width: 180,
          renderCell: (params) => {
            return (
              <Action>
                <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
                {/* <View onClick={() => navigate(`/admin/users/${params.row.id}`)}>View</View> */}
              </Action>   
            )
           }
        },
      ];

      
  return (
    <>
        <Navbar/>
            <div style={wrapper}>
                <div style={{ height: 450, width: '90%', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                  />
                </div>
            </div>
    </>
  );
}