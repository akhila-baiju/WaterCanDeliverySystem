import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box } from '@mui/material';
import image1 from '../../assets/images/aqua.png';
import image2 from '../../assets/images/bailley.png';
import image3 from '../../assets/images/bisleri-1.png';
import image4 from '../../assets/images/blu.jpg';
import image5 from '../../assets/images/hillvalley.jpg';
import image6 from '../../assets/images/mistblue.jpg';

const images = [
    image1,image2,image3,image4,image5,image6
  ];

function ProductList() {
  return (
    <Box sx={{ maxWidth: 150, flexGrow: 1, margin: 'auto', mt: 2 }}>
      <Carousel>
        {images.map((image, i) => (
          <Paper key={i} elevation={10}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: '80px',
                objectFit: 'cover'
              }}
              src={image}
              alt={`Slide ${i}`}
            />
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
}

export default ProductList;