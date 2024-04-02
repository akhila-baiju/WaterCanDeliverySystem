import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Avatar } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import manufacturerService from '../../services/manufacturerService';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
const Addproducts = () => {
    const navigate = useNavigate();
    const [age, setAge] = useState('');
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const [data, setData] = useState(null);
    const [mname,setMname] = useState(null);
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
      useEffect(() => {
        const fetchData1 = async () => {
       try {
          const response = await manufacturerService.getAllManufacturers();
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }        
          const result1 = await response.json();
          setMname(result1);
    } catch (error) {
      console.error('Error fetching data:', error.message);
  }

        };
        fetchData1();
      }, []);

      const handleManufacture = async (event) => {
        const manu_id = event.target.value;
        try {
        const response = await productService.getProducts(manu_id);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }        
        const result = await response.json();
        setData(result);
  } catch (error) {
    console.error('Error fetching data:', error.message);
}

      } 
      
      const handleProducts=async (event) => {
        const product_id = event.target.value;
        try {
          const response = await productService.getProductsById(product_id);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }        
          const result = await response.json();
          setData(result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
  }        
      }

      const handleAdd=(event)=>{
       navigate("/vendor/myproducts")
        alert("add = "+event)
      }


  return (
    <div  >Addproducts
          <Box
      sx={{
        bgcolor: 'background.paper',
        //width: 1385,
        position: 'relative',
        minHeight: 500,
      }}
    >
        <AppBar position="static"  color="default">
        <Box component="form" sx={{'& .MuiTextField-root': { m: 2, width: '25ch', },}} noValidate autoComplete="off" >
        <Grid container spacing={2}>
        <Grid item xs={6}>
            <Item>
        
  
        <FormControl variant="standard"  sx={{ m: 1, minWidth: 180 }}>
                <InputLabel variant="standard" htmlFor="Products">
                   Select Products
                </InputLabel>
                <NativeSelect   defaultValue={"--Select--"} onChange={handleProducts}>
                <option value={""} ></option>
                {data && data.map(row => (
                  <option value={row._id} >{row.productName}</option>
                ))}
                   
                </NativeSelect>
            </FormControl>
            </Item>
            </Grid>
        <Grid item xs={6}>
            <Item>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                <InputLabel variant="standard" htmlFor="Products">
                   Select Manufactures
                </InputLabel>
                {/* <NativeSelect   defaultValue={"--Select--"} inputProps={{name: 'products', id: 'products', }} > */}
                <NativeSelect   defaultValue={"--Select--"} onChange={handleManufacture}>
                <option value={""}></option>
                {mname && mname.map(row1 => (
                  <option value={row1._id} >{row1.firstName+row1.lastName}</option>
                ))}
                </NativeSelect>
            </FormControl>
            </Item>
        </Grid>
        </Grid>
        </Box>


        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch', },}} noValidate autoComplete="off" >
        <div>
        
        </div>

        </Box>
        <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
                {/* <Title>Products </Title> */}
                <Table size="small">
                    <TableHead>
                    <TableRow>
                    <TableCell></TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Product Weight(in Liters)</TableCell>
                        <TableCell>Product Price(Rs.)</TableCell>
                        <TableCell >Available Numbers</TableCell>
                       
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map(row => (
                     
                    //{(!data) ?(data.map((row,index) => (
                        <TableRow key={row._id}>
                      <TableCell > {row.imageUrl && 
              <img style={{ width: '50px', height: '50px' }}
                src={
                    'http://localhost:3001//' + row.imageUrl.replace(/public\\/, '')
                }
            />} </TableCell>
                        <TableCell>{row.productName}</TableCell>
                        <TableCell>{`${row.productWeight}`+"liters"}</TableCell>
                        <TableCell>{`₹${row.productPrice}`}</TableCell>
                        <TableCell>{row.pNumber}</TableCell>
                      
                                  
                        <TableCell onClick={e => handleAdd(row._id)} value={row._id}> 
                        <Avatar sx={{ bgcolor: "primary.main" ,width: 24, height: 24 }}><AddTaskIcon/></Avatar>
                          </TableCell>
                        <TableCell align="right">
                        <Avatar sx={{ bgcolor: "primary.main" ,width: 24, height: 24 }}> <DeleteOutlineIcon/></Avatar>
                       </TableCell>
                        </TableRow>
                    ))}
                
                </TableBody>
      </Table>
       </React.Fragment>
    </Paper></Grid>
</AppBar></Box>
    </div>
  )
}

export default Addproducts

