import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Input from '@mui/material/Input';

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { useState,useEffect } from "react";
import manufacturerService from "../../services/manufacturerService";
import productService from "../../services/productService";
const theme = createTheme();

// toast.configure();

const registerSchema = Yup.object().shape({
  // productName: yup.string().required("Product Name Required"),
  // productWeight: yup.string()
  // .matches(/^[0-9]+$/, 'Product Weight should only contain digits')
  // .matches(/^((?![eE]).)*$/, 'Letter "e" is not allowed')
  // .required("Product Weight required"),
  // productPrice: yup.string()
  // .matches(/^[0-9]+$/, 'Product Price should only contain digits')
  //   .matches(/^((?![eE]).)*$/, 'Letter "e" is not allowed')
  //   .required("Product Price required"),
  // pNumber: yup.string()
  // .matches(/^[0-9]+$/, 'Enter only digits')
  //   .matches(/^((?![eE]).)*$/, 'Letter "e" is not allowed')
  //   .required("Please add At least one item"),

   
  });


const Addproducts = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const { palette } = useTheme();
  const [image, setImage] = useState(null);
  const [id, setId] = useState(() => {
    try {
      // Retrieve data from localStorage
      console.log("id-- "+localStorage.getItem('id'))
      return localStorage.getItem('id');
    } catch (error) {
      console.error('Error getting data from localStorage:', error);
      return null;
    }
  });
  
const ariaLabel = { 'aria-label': 'description' };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id){
            const response = await manufacturerService.getManufacturer(id);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }        
            const result = await response.json();
           // console.log(result)
            setName(result);
          }else{
              console.error("id not found")
          }
      } catch (error) {
        console.error('Error fetching data:', error.message);
    }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (values, actions) => {
    
    const formData = new FormData();
    formData.append('manufactureId', id);
    formData.append('productName', values.productName);
    formData.append('productWeight', values.productWeight);
    formData.append('productPrice', values.productPrice);
    formData.append('pNumber', values.pNumber);
    formData.append('image', values.image);

    try {
      const response = productService.uploadProducts(formData); 
      toast.success("Your Product Added Successfully!!! ");
      navigate('/manufacturer/listproducts');

    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const validationSchema = Yup.object().shape({
   // name: Yup.string().required('Name is required'),
    image: Yup.mixed().required('Image is required'),
    productName: Yup.string().required("Product Name Required"),
  productWeight: Yup.string()
  .matches(/^[0-9]+$/, 'Product Weight should only contain digits')
  .matches(/^((?![eE]).)*$/, 'Letter "e" is not allowed')
  .required("Product Weight required"),
  productPrice: Yup.string()
  .matches(/^[0-9]+$/, 'Product Price should only contain digits')
    .matches(/^((?![eE]).)*$/, 'Letter "e" is not allowed')
    .required("Product Price required"),
  pNumber: Yup.string()
  .matches(/^[0-9]+$/, 'Enter only digits')
    .matches(/^((?![eE]).)*$/, 'Letter "e" is not allowed')
    .required("Please add At least one item"),
  });
  const firstValues ={
    manufactureId: id,
    // manufactureName :name,
     productName: "",
     productWeight: "",
     productPrice: "",
     pNumber: "",
    // name:"",
     image :null,
     };
  return (
    <div>
      {/* <h2>Add New Item</h2> */}
      <Formik
        initialValues={firstValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({  
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue 
      }) => (
          <Form>
           <Box>
          <ThemeProvider theme={theme}>
            <Grid container component="main" >
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={4}
              />
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{  bgcolor: "secondary.main" }}>
                  <AddCircleOutlineRounded/>
                  </Avatar>
                  <Typography component="h1" variant="h5"> 
                   <p>Add New Products</p>
                    </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12} >
                    <Field name="productName">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Product Name"
                    fullWidth
                    variant="outlined"
                    error={Boolean(field.value && field.value.trim() === '' && field.touched)}
                    helperText={<ErrorMessage name="productName" />}
                  />
                )}
              </Field> 
                    </Grid>

             <Grid item xs={12} >
                    <Field name="productWeight">
                  {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Product Weight"
                    variant="outlined"
                    error={Boolean(field.value && field.value.trim() === '' && field.touched)}
                    helperText={<ErrorMessage name="productWeight" />}
                  />
                )}
              </Field> 
            </Grid>
            <Grid item xs={12} >
                    <Field name="productPrice">
                  {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Product Price"
                    variant="outlined"
                    error={Boolean(field.value && field.value.trim() === '' && field.touched)}
                    helperText={<ErrorMessage name="productPrice" />}
                  />
                )}
              </Field> 
            </Grid>

            <Grid item xs={12} >
                    <Field name="pNumber">
                  {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Number of Products"
                    variant="outlined"
                    error={Boolean(field.value && field.value.trim() === '' && field.touched)}
                    helperText={<ErrorMessage name="pNumber" />}
                  />
                )}
              </Field> 
            </Grid>
          <Grid item xs={12}>
          <Field name="image">
                {({ field }) => (
                  <TextField
                    type="file"
                    //label="Image"
                    variant="outlined"
                    error={Boolean(!field.value && field.touched)}
                    helperText={<ErrorMessage name="image" />}
                    onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                  />
                )}
              </Field>
          </Grid>
            
              {/* <Field name="name">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Item Name"
                    variant="outlined"
                    error={Boolean(field.value && field.value.trim() === '' && field.touched)}
                    helperText={<ErrorMessage name="name" />}
                  />
                )}
              </Field> */}
              
            
            <div>
              
            </div>
            <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Add 
                    </Button>
                     </Grid>
            </Box>
            </Grid>
            </Grid>
            </ThemeProvider>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Addproducts;
