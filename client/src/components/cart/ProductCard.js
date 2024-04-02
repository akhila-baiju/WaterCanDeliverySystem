import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import Link from "@mui/material/Link";
const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const handleLogin=()=>
  {
    navigate("/login");
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="340"
        image={'http://localhost:3001//' + product.imageUrl.replace(/public\\/, '')}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Number of Available Item: {product.pNumber} 
        </Typography>
      </CardContent>
      <CardActions>
      {/* <Link href="/login" variant="body2">
                {"Login to Buy"}
                </Link> */}
                <Typography>Your Cart is Empty ...</Typography>
        <Button size="small" onClick={handleLogin}>
           Login to Buy
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;