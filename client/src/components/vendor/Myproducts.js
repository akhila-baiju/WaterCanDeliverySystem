import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/joy/Typography';
import photo from '../../assets/images/bisleri.jpg';
import { IconButton } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
}));

const Myproducts = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0.5}>
    <Grid item xs={12}>
        <Item><Typography>Add To My Page</Typography></Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
        <img style={{ width: '250px', height: '250px', marginTop:'80px' }}
                src={photo }/>

          
        </Item>
      </Grid>
      <Grid item xs={8}>
        <Item>
        <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
              >
                
              </AspectRatio>
<IconButton 
 aria-label="upload new picture"
 size="sm"
 variant="outlined"
 color="neutral"
 sx={{
   bgcolor: 'background.body',
   position: 'absolute',
   zIndex: 2,
   borderRadius: '50%',
   left: 100,
   top: 170,
   boxShadow: 'sm',
 }}> <EditRoundedIcon />
        </IconButton>    
        </Item>
      </Grid>


      <Grid item xs={4}>
        <Item>xs=4</Item>
      </Grid>
     
    </Grid>
  </Box>
  )
}

export default Myproducts


