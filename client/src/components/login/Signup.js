import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
//import { useTheme } from '@react-navigation/native';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, Field, Form, ErrorMessage } from 'formik';
//import * as yup from 'yup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import * as yup from "yup";
import loginService from '../../services/loginService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

// toast.configure();

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name Required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string()
    .min(4, "Password must be minimum 4 digits!")
    .required("Password Required!"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Password must match!")
    .required("Confirm password is reqired!"),
  contactNumber: yup.string().required("required"),
  contactNumber: yup.string()
    .matches(/^[0-9]+$/, 'Mobile number should only contain digits')
    .matches(/^((?![eE]).)*$/, 'Letter "e" is not allowed')
    .min(10, 'Mobile number must be at least 10 digits')
    .max(12, 'Mobile number must be at maximun 12 digits')
    .required('Mobile number is required'),
  userType: yup.string().required("userType is required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  contactNumber: "",
  userType: ""

};
const Signup = () => {
  const navigate = useNavigate();
  // const [type, setType] = React.useState('');
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const { palette } = useTheme();


  const handleFormSubmit = async (values) => {
    try {

      const response = loginService.signupUser(values);
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    toast.success("Your Account Created Successfully!!! Enjoy Shopping!!");

    navigate('/welcome');
  };



  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  return (
    <Formik initialValues={initialValuesRegister}
        onSubmit={(values, { resetForm }) => {
        handleFormSubmit(values);
        resetForm()
      }}
      validationSchema={registerSchema}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm
      }) => ( 
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
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box
                    sx={{ mt: 3 }}
                  >
               <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="First Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                          autoComplete="given-name"
                          name="firstName"
                          error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                          fullWidth
                          id="firstName"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          //autoFocus
                          //required
                          label="Last Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                          autoComplete="given-name"
                          name="lastName"
                          error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                          fullWidth
                          id="lastName"

                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          //autoFocus
                          //required
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
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          // required
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
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Confirm Password"
                          type="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.confirmPassword}
                          fullWidth
                          name="confirmPassword"
                          error={
                            Boolean(touched.confirmPassword) &&
                            Boolean(errors.confirmPassword)
                          }
                          helperText={touched.confirmPassword && errors.confirmPassword}
                          sx={{ gridColumn: "span 4" }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          // required
                          fullWidth
                          name="contactNumber"
                          label="Contact Number"
                          id="contactNumber"
                          autoComplete="contact-number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.contactNumber) && Boolean(errors.contactNumber)}
                          helperText={touched.contactNumber && errors.contactNumber}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <RadioGroup
                            row
                            defaultValue="customer"
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="userType"
                            value={values.userType}
                            onChange={handleChange}
                            error={Boolean(touched.userType) && Boolean(errors.userType)}
                            helperText={touched.userType && errors.userType}
                          >

                            <FormControlLabel value="customer" control={<Radio />} label=" I am a Customer" />
                            <FormControlLabel value="vendor" control={<Radio />} label="I am a Seller" />
                            <FormControlLabel value="manufacturer" control={<Radio />} label=" I am a Manufacturer" />

                          </RadioGroup>
                        </FormControl>
                      </Grid>




                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
</Form>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/login" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>

                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
       
      )}
    </Formik>
  );
}
export default Signup