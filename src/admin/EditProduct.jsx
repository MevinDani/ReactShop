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
import { productUpdate } from '../redux/admItemsRedux';

const Edit = styled.button`
    background-color: rgb(32, 177, 255);   
`


export default function EditProduct({prodId}) {

  const [open, setOpen] = useState(false);
  const [currentProd,setCurrentProd] = useState({})
  const [previewImg,setPreviewImg] = useState('')
  const [productImg, setProductImg] = useState("");
  const [inStock,setStock] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch()

  const token = JSON.parse(localStorage.getItem('token'))

  const {list,editStatus} = useSelector(state => state.items)

//   console.log(list)

  const handleClickOpen = () => {
    setOpen(true);
    let selectedProd = list.filter((item) => item._id == prodId)
    // console.log(selectedProd)

    setCurrentProd(selectedProd[0])
    setPreviewImg(selectedProd[0].img)
    setProductImg("")
    setPrice(selectedProd[0].price)
    setName(selectedProd[0].title)
    setDesc(selectedProd[0].desc)
    setStock(selectedProd[0].inStock)
  };

  const handleClose = () => {
    setOpen(false);
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
      productUpdate({
        productImg,
        token,
        product: {
            ...currentProd,
            title:name,
            inStock,
            price,
            desc
        }
      })
    );
  };

  return (
    <>
        <div>
          <Edit onClick={handleClickOpen}>
            Edit
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
                        <option value="">Stock status</option>
                        <option value="true">inStock</option>
                        <option value="false">outOfStock</option>
                    </select>
                    <PrimaryButton type="submit">
                    {editStatus === "pending" ? "Submitting" : "Submit"}
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