import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
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
//import loginService from '../../services/loginService';
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import userService from '../../services/userService';
import { Avatar } from '@mui/material'

const Forgetpassword = () => {
  const [usersType, setUsersType] = useState([]);
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const registerSchema = yup.object().shape({
   
    email: yup.string().email("invalid email").required("Email required"),
   
   });

  const initialValue = {
       email: "",
      
     };
     
     const handleFormSubmit = async (values) => { 
       try {
        const response =await userService.sendMail(values);
        if(response.data.message == "User not found")
        {
          toast.warning(response.data.message)
        }
        else{
          navigate('/login')
          toast.success("Check Your Mail" );}
            }
          catch (error) {
         console.error('Error submitting form:', error);
       }
      
      
    };

  return (
    <Container component="main" maxWidth="xs" >
        <Formik  initialValues={initialValue}
        onSubmit={(values) => {
        handleFormSubmit(values);
      }}
    validationSchema={registerSchema}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
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
         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon/>
        </Avatar>
		<Typography component="h1" variant="h5">
		Forget password
		</Typography>
        <Box   sx={{ mt: 1 }}>
        <TextField
                    autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           Send Mail
          </Button>
          <Grid container>
            <Grid item xs>
            <Link href="/login" variant="body2">
                {"Back to SignIn"}
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

export default Forgetpassword