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
import { ordersEdit, ordersFetch } from '../redux/orderRedux';
import moment from 'moment'


export default function OrderList() {

    const {orders} = useSelector(state => state.orders)
    const {list} = useSelector(state => state.items)

    // console.log("ord",orders)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        dispatch(
            ordersFetch(token)
        )
    },[])

    const handleDelete = async(id) => {
        const res = await publicRequest.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data)
        dispatch(
            itemsFetch()
        )
    }

    const handleOrderDispatch = (id) => {
        dispatch(
            ordersEdit({
                id,
                token,
                delivery_status:"dispatched"
            })
        )
    }

    const handleOrderDeliver = (id) => {
        dispatch(
            ordersEdit({
                id,
                token,
                delivery_status:"delivered"
            })
        )
    }

    // const testRow = orders && 

    const rows = orders && orders.map((order) => {
        // console.log(item)
        return {
            id:order._id,
            cName:order.shipping.name,
            amount:(order.total / 100),
            dStatus:order.delivery_status,
            date:moment(order.createdAt).fromNow()
        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'cName', headerName: 'Name', width: 120},
        { field: 'amount', headerName: 'Amount($)', width: 100 },
        {
          field: 'dStatus',
          headerName: 'Delivery Status',
          type: 'number',
          width: 100,
          renderCell: (params) => {
            return (
                <div>
                    {  
                        params.row.dStatus === 'pending' ? <Pending>Pending</Pending> :
                        params.row.dStatus === 'dispatched' ? <Dispatched>Dispatched</Dispatched> :
                        params.row.dStatus === 'delivered' ? <Delivered>Delivered</Delivered> : "error"
                    }
                </div>  
            )
        }
        },
        {
            field: 'date',
            headerName: 'Date',
            type: 'number',
            width: 120,
        },
        {
          field: 'actions',
          headerName: 'Actions',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 220,
          renderCell: (params) => {
            return (
                <Action>
                    {
                        params.row.dStatus !== 'delivered' ? 
                        <>
                            <DispatchBtn onClick={()=>handleOrderDispatch(params.row.id)}>Dispatch</DispatchBtn>
                            <DeliveryBtn onClick={()=>handleOrderDeliver(params.row.id)}>Delivered</DeliveryBtn>
                        </> : ""
                    }
                    <Views onClick={()=>navigate(`/admin/orders/${params.row.id}`)}>View</Views>
                </Action>  
            )
        }
        },
      ];
      
  return (
    <>
        <Navbar/>
            <div style={wrapper}>
                <div style={{ height: 400, width: '90%', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
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

const DispatchBtn = styled.button`
    background-color: rgb(38, 198, 249);
`
const DeliveryBtn = styled.button`
    background-color: rgb(102, 108, 255);
`

const Views = styled.button`
    background-color: rgb(114, 225, 40);
`
const Pending = styled.div`
    color: rgb(253, 181, 40);
    background: rgb(253, 181, 40, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`
const Dispatched = styled.div`
    color: rgb(38, 198, 249);
    background-color: rgb(38, 198, 249, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`
const Delivered = styled.div`
    color: rgb(102, 108, 255);
    background-color: rgba(102, 108, 255, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
    
`