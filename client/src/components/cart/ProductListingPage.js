import { useState ,useEffect} from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
 // Link,
} from "@mui/material";
import { Link } from 'react-router-dom';
import Checkout from './Checkout.js';
import productService from '../../services/productService';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/joy/Stack';
//import Link from "@mui/material";
import { useHistory } from 'react-router-dom';
import cartService from "../../services/cartService.js";

const ProductCard = ({ product, onAdd }) => (
  
  <Card raised>
    <CardMedia
      component="img"
      height="340"
      image={'http://localhost:3001//' + product.imageUrl.replace(/public\\/, '')}
      alt={product.productName}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {product.productName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.pNumber}
      </Typography>
      <Typography variant="body1">Rs.{product.productPrice}</Typography>
    </CardContent>
    <CardActions>
      <Button size="small" variant="contained" onClick={() => onAdd(product)}>
        Add to Cart
      </Button>
    </CardActions>
  </Card>
);

const CheckoutView = ({ product,onAdd}) => 

(
 <Button fullWidth variant="contained"  sx={{ mt: 1, mb: 2 }}  onClick={() => onAdd(product)}>
  Proceed to Checkout
</Button> 
);



const ShoppingCartOverview = ({ cartItems }) => {
  const navigate = useNavigate();
 
  const handleCheckout=(cartItems)=>{
    console.log("cartitems id== "+JSON.stringify(cartItems))
    
   // const response = cartService.addToCart(cartItems);
  //  localStorage.setItem('cart', JSON.stringify(cartItems));
    //navigate('/user/userheader/usercheckout')
 
    } 
  
  return(
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
            secondary={`Quantity: ${item.quantity}`}
          />
          <Typography variant="body2">
            Rs.{(item.productPrice * item.quantity).toFixed(2)}
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
    {(cartItems!=0) && (
        <CheckoutView product={cartItems} onAdd={handleCheckout} />
      )}
    
      </Paper>
)
};


const ProductListingPage = () => {
 
  const [cart, setCart] = useState([]);
  const [data, setData] = useState(null);
  const [cart1,setCart1] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
            const response = await productService.getAllProducts();
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }        
            const result = await response.json();
          
            setData(result);
      } catch (error) {
        console.error('Error fetching data:', error.message);
    }

    };
    fetchData();
  }, []);
  //const [products] = useState(data);
  const handleCart=()=>{

  }
  
  const handleAddToCart = (productToAdd) => {
    const quantity=1;
    const userId = localStorage.getItem("id");
    try {
      const response =  cartService.preCart(productToAdd._id);
      // {response.map(item => (
      // console.log("re- "+response)
      // ))}
      setCart1(response.data)
     
      } catch (error) {
          console.error('Error fetching data:', error.message);
      }
      if(cart1){
        console.log("cart1- "+cart1)
      {cart1.map(item => (
      console.log(item)
        (item.productId == productToAdd._id )
        ? cartService.addToCart(productToAdd,item.quantity + 1,userId)
            : cartService.addToCart(productToAdd,quantity,userId)
      ))}
      }else{
        console.log("in else")
        cartService.addToCart(productToAdd,quantity,userId)
      }




    
      
     










    //  const response = cartService.preCart();
      //console.log("res-- "+response)
      // if (!response) {
      //   throw new Error('Failed to fetch data');
      // }  
     // const result =  response.json();
      // console.log("result===="+result)
       // setCart1(response);
    
      
      
        console.log("yes"+cart1)
     
        // console.log("cart1.productId="+cart1.productId+" "+"productToAdd._id= "+productToAdd._id)
        // console.log("cart1.manufactureId="+cart1.manufactureId+" "+"productToAdd.manufactureId= "+productToAdd.manufactureId)
      //  ( cart1.productId == productToAdd._id && cart1.manufactureId == productToAdd.manufactureId)
      //   ? cartService.addToCart(productToAdd,cart1.quantity + 1)
      //       : cartService.addToCart(productToAdd,quantity) 
     // }
       //add to db
        //   prevCart.map((item) =>
        //   // console.log("id--"+item._id+"--- "+productToAdd._id);
        //     item._id === productToAdd._id
        //     ? cartService.addToCart(item,item.quantity + 1)
        //     : cartService.addToCart(item,item.quantity)
        // );
        //  const response = cartService.addToCart(productToAdd,quantity);
        setCart((prevCart) => {
        const productExists = prevCart.find(
          (item) => item._id === productToAdd._id
        );
      if (productExists) {
          return prevCart.map((item) =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
           <Grid container spacing={2}>
            {(data)&& data.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                 <ProductCard product={product} onAdd={handleAddToCart} /> 
               
              </Grid>
            ))}
          </Grid> 
        </Grid>
        <Grid item xs={12} md={4}>
          <ShoppingCartOverview cartItems={cart} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductListingPage;