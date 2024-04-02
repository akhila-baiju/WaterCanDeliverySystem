import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import productService from '../../services/productService';
import { useState,useEffect } from 'react';

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Listproducts() {
    const [data, setData] = useState(null);
    const id = localStorage.getItem('id');
    const [img,setImg] = useState();
    useEffect(() => {
        const fetchData = async () => {
          try {
                const response = await productService.getProducts(id);
                if (!response.ok) {
                  throw new Error('Failed to fetch data');
                }        
                const result = await response.json();
                setData(result);
                setImg(response.data[0].img)
                //console.log("hi == "+result)
          } catch (error) {
            console.error('Error fetching data:', error.message);
        }
        };
    
        fetchData();
      }, [id]);
const handleImage=(img)=>
{
  //alert("hi")
 // const blob = new Blob([Int8Array.from(data.img.data.data)], {type: data.img.contentType });
 // const image = window.URL.createObjectURL(blob);
}

  return (
    <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <React.Fragment>
      <Title>My Products </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Product </TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Weight(in Liters)</TableCell>
            <TableCell>Product Price(Rs.)</TableCell>
            
            <TableCell align="right">Available Numbers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {data && data.map(row => (
             <TableRow key={row.id}>
              <TableCell > {row.imageUrl && 
              <img style={{ width: '50px', height: '50px' }}
                src={
                    'http://localhost:3001//' + row.imageUrl.replace(/public\\/, '')
                }
            />} </TableCell>
             
              <TableCell>{row.productName}</TableCell>
              <TableCell>{`${row.productWeight}`}</TableCell>
              <TableCell>{`₹${row.productPrice}`}</TableCell>
              <TableCell align="right">{row.pNumber}</TableCell>
            </TableRow>
          ))}
       
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
    </Paper></Grid>
  );
}