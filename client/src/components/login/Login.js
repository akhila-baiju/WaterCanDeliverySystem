import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import loginService from '../../services/loginService';
import { useState } from "react";

const Login = () => {
  const [usersType, setUsersType] = useState([]);
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const registerSchema = yup.object().shape({
   
    email: yup.string().email("invalid email").required("Email required"),
    password: yup.string()
    .min(4, "Password must be minimum 4 digits!")
    .required("Password Required!")
   });

  const initialValue = {
       email: "",
       password: ""
     };
     
     const handleFormSubmit = async (values) => { 
       try {
         const response =await loginService.loginUser(values);
         navigate(response);
         toast.success("Success!! Welcome to WCDS!!" );
      
       } catch (error) {
         console.error('Error submitting form:', error);
         toast.warning("Wrong credentials!!!!" );
       }
       
       
      
    };

  return (
    <Container component="main" maxWidth="xs" >
        <Formik  initialValues={initialValue}
    // onSubmit={(values) => {
    //   handleFormSubmit(values);
    //  // resetForm()
    onSubmit={(values) => {
      handleFormSubmit(values);
      //resetForm()
 }}
    validationSchema={registerSchema}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        //handleSubmit,
        handleFormSubmit
        //resetForm
      }) => (
      <Form>
      <Box
        sx={{  
          marginTop: 8,
          marginBottom: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box   sx={{ mt: 1 }}>
        <TextField
                 // autoFocus
                    //required
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  
                  />
                  <TextField
                   // required
                   margin="normal"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                   />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            <Link href="/forgetpassword" variant="body2">
                {"Forget Password ?"}
                </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>



          
        </Box>
      </Box>
      </Form>
    )}
   </Formik>
    </Container>
    
  );
}

export default Login