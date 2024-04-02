import React,{ useState,useEffect } from 'react';
import ProductCard from '../cart/ProductCard';
import CartPage from '../cart/CartPage';
// import image1 from "../../assets/images/aquafina.jpg";
// import image2 from "../../assets/images/bisleri.jpg";
// import image3 from "../../assets/images/Blue_mountain.png";
// import image4 from "../../assets/images/Green_Valley.png";
import ProductList from './ProductList';
import { Container, Grid } from '@mui/material';
import Box from "@mui/material/Box";
import productService from '../../services/productService';
// const products = [
  
//   { id: 1, name: 'Aquafina', description: 'Mineral Water', image: image1 },
//   { id: 2, name: 'Bisleri', description: 'Mineral Water', image: image2 },
//   { id: 3, name: 'Blue Mountain', description: 'Mineral Water', image: image3 },
//  ];

const Products = () => {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
            const response = await productService.getAllProducts();
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }        
            const result = await response.json();
          // console.log("result===="+result)
            setData(result);
      } catch (error) {
        console.error('Error fetching data:', error.message);
    }

    };
    fetchData();
  }, []);





  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.find((item) => item.id === product._id);
      if (isProductInCart) {
        return (prevCart)&&prevCart.map((item) =>
          item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
     
      //localStorage.setItem("cart",cart);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (  
     <Container component="div" >
      <ProductList/>
        
      {/* <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} >
            <ProductCard product={product} onAddToCart={handleAddToCart} height={500} />
          </Grid>
        ))}
      </Grid> */}
      <Grid container spacing={4}>
        {(data)&&data.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} >
            <ProductCard product={product} height={500} />
            {/* <ProductCard product={product} onAddToCart={handleAddToCart} height={500} /> */}
          </Grid>
        ))}
      </Grid>
      {/* <CartPage cartItems={cart} /> */}
    </Container>
  

  );
};

export default Products;