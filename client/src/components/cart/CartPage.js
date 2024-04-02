
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  Link,
  Paper,
  Modal,
  Button,
  Box,
  TextField,
  
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkout from './Checkout';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, handleQuantityChange, deleteItem }) => {

  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const navigate=useNavigate();
    const handleOpenModal = (item) => {
    setShowModal(true);
    setItemToDelete(item);
    
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      handleCloseModal();
    }
  };
  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const toCheckout = (cartItems) => {
    navigate('/user/userheader/usercheckout')
  }
  
  return (
   
 <Paper elevation={3} sx={{ p: 2 }}>
     <Typography variant="h6" gutterBottom>
       Shopping Cart
     </Typography>
     <Divider />
     <List>
     {cartItems.map((item, index) => (
      
  <ListItem key={index} divider>
    <ListItemText
      primary={item.productName}
      secondary={
        <>Quantity:&nbsp;
         <FormControl >
        
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                    value={selectedQuantities[item._id] || item.quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                    style={{
                       width:60,
                      height:20,
                    
                      }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
        
              </>}/>
           <Typography variant="body2">
             Rs.{(item.productPrice * item.quantity).toFixed(2)}<br></br>
             <Link
                component="button"
                variant="body2"
                underline='none'
                onClick={() => handleOpenModal(item)}
              >
                 Delete
            </Link>
          
           </Typography>
         </ListItem>
       ))}
     </List>
     <Typography variant="h6">
       Total: Rs.
       {cartItems
         .reduce((total, item) => total + item.productPrice * item.quantity, 0)
         .toFixed(2)}
     </Typography>

     <Modal open={showModal} onClose={handleCloseModal}>
        <div>
        <Box sx={{ ...style}}>
          <Typography variant="h6">Confirm Deletion</Typography>
          <Typography variant="body1">
            Are you sure you want to delete this item?
          </Typography>
          <Button onClick={handleConfirmDelete}>Delete</Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
          </Box>
        </div>
      </Modal>

      {/* {(cartItems!=0) && (
         <CheckoutView product={cartItems} />
      )}  */}
      {(cartItems!=0) && (
         <Button fullWidth variant="contained"  sx={{ mt: 1, mb: 2 }}  onClick={() => toCheckout(cartItems)}>
         Proceed to Checkout
       </Button> 
      )} 
    
       </Paper> 

  )}
export default CartPage;
