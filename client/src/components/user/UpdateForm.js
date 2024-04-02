import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Grid } from '@mui/material';
import * as Yup from 'yup';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateForm({ initialValues }) {
  const navigate = useNavigate();
  const onSubmit = async(values, { setSubmitting }) => {
   // alert(JSON.stringify(values, null, 2));
    try {
            const response = await userService.updateUser(values);
        } catch (error) {
            console.error('Error updating user:', error);
        }
       
        toast.success("Profile Data Updated Succseefully!!! ");
        navigate('/user/userheader/userprofile');
   // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  };

 
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    contactNumber: Yup.string().required("required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Mobile number should only contain digits')
      .matches(/^((?![eE]).)*$/, 'Letter "e" is not allowed')
      .min(10, 'Mobile number must be at least 10 digits')
      .max(12, 'Mobile number must be at maximun 12 digits')
      .required('Mobile number is required'),
    address: Yup.string().required('Address is required'),
  });
  return (
    <div>
     
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => ( // Define errors here
          <Form>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
         
            <Field name="firstName">
              {({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="standard"
                  fullWidth
                  error={Boolean(errors.firstName)} // Use errors.firstName
                  helperText={errors.firstName} // Use errors.firstName
                />
              )}
            </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Field name="lastName">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="standard"
                  fullWidth
                  error={Boolean(errors.lastName)} // Use errors.lastName
                  helperText={errors.lastName} // Use errors.lastName
                />
              )}
            </Field>
                </Grid>
                <Grid item xs={12} >
            <Field name="email">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="standard"
                  fullWidth
                  error={Boolean(errors.email)} // Use errors.email
                  helperText={errors.email} // Use errors.email
                />
              )}
            </Field>
            </Grid>
            <Grid item xs={12} >
            <Field name="contactNumber">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Contact Number"
                  variant="standard"
                  type="text"
                  fullWidth
                  error={Boolean(errors.contactNumber)} // Use errors.contactNumber
                  helperText={errors.contactNumber} // Use errors.contactNumber
                />
              )}
            </Field>
</Grid><Grid item xs={12} >
            <Field name="address">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  variant="standard"
                  fullWidth
                  error={Boolean(errors.address)} // Use errors.address
                  helperText={errors.address} // Use errors.address
                />
              )}
            </Field>
            </Grid>
            
            <Grid item xs={12} >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Update Profile
            </Button>
            </Grid></Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}


export default UpdateForm;
