import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, itemsFetch, productUpdate } from '../redux/admItemsRedux';


export default function CreateProduct() {

  const [open, setOpen] = useState(false);
//   const [currentProd,setCurrentProd] = useState({})
  const [previewImg,setPreviewImg] = useState('')
  const [productImg, setProductImg] = useState("");
  const [inStock,setStock] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category,setCategory] = useState("")

  const dispatch = useDispatch()

  const token = JSON.parse(localStorage.getItem('token'))

  const {createStatus} = useSelector(state => state.items)

//   console.log(createStatus)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(
        itemsFetch()
    )
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setPreviewImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
        createProduct({
            productImg,
                token,
                product: {
                    name,
                    inStock,
                    price,
                    desc,
                    category
                }
        })
    )
  };

  return (
    <>
        <div>
          <Edit onClick={handleClickOpen}>
            Create Product
          </Edit>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
            <StyledCreateProduct>
                <StyledForm onSubmit={handleSubmit}>
                    <h3>Create a Product</h3>
                    <input
                    id="imgUpload"
                    accept="image/*"
                    type="file"
                    onChange={handleProductImageUpload}
                    />
                    <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                    />
                    <input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    required
                    />
                    <input
                    type="text"
                    placeholder="Short Description"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    required
                    />
                    <select onChange={(e) => setStock(e.target.value)} value={inStock} required>
                        <option value="" disabled>Stock status</option>
                        <option value="true">inStock</option>
                        <option value="false">outOfStock</option>
                    </select>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} required>
                        <option value="" disabled>Category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                    <PrimaryButton type="submit">
                    {createStatus === "pending" ? "Submitting" : "Submit"}
                    </PrimaryButton>
                </StyledForm>
                <ImagePreview>
                    {(previewImg) ? (
                    <>
                        <img src={previewImg} alt="error!" />
                    </>
                    ) : (
                    <p>Product image upload preview will appear here!</p>
                    )}
                </ImagePreview>
            </StyledCreateProduct>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;

const PrimaryButton = styled.button`
  padding: 9px 12px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0.5rem 0;
`;

const Edit = styled.button`
    background-color: rgb(111, 119, 214);  
    border:none;
    color:white; 
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
    }
`