import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
//import { useNavigate } from 'react-router-dom';
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup.string().required("required"),
  contactNumber: yup.string().required("required"),
  userType: yup.string().required("required")
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  contactNumber:"",
  userType: ""
 
};

const type = [
  {
    value: "Student",
    label: "Student"
  },
  {
    value: "Teacher",
    label: "Teacher"
  }
];

const SignUp1 = () => {
  const navigate =useNavigate();
  const { palette } = useTheme();
  // const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const register = async (values) => {
   // alert(values)
    // const savedUserResponse = await fetch(
    //   "http://localhost:3001/auth/register",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(values)
    //   }
    // );

    // const savedUser = await savedUserResponse.json();
  

    // if (savedUser) {
    //   console.log(savedUser);
    //   navigate("/");
    // }
  };

  const handleFormSubmit = async (values) => {
    alert(values)
    // await register(values);
  };

  return (
    <Formik
      initialValues={initialValuesRegister}
      onSubmit={(values, {resetForm}) => {
           handleFormSubmit(values);
           resetForm()
      }}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm
      }) => (
        <Form>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
            }}
          >
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              id="outlined-select"
              select
              label="Select Type"
              name="userType"
              value={values.userType}
              onChange={handleChange}
              defaultValue="student"
            >
              {type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="User Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.userName}
              name="userName"
              error={Boolean(touched.userName) && Boolean(errors.userName)}
              helperText={touched.userName && errors.userName}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              name="confirmPassword"
              error={
                Boolean(touched.confirmPassword) &&
                Boolean(errors.confirmPassword)
              }
              helperText={touched.confirmPassword && errors.confirmPassword}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {/* BUTTONS */}
          <Box>
            <Button
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main }
              }}
            >
              {" "}
              REGISTER
            </Button>
            <Typography
              onClick={() => {
                navigate("/login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light
                }
              }}
            >
              Already have an account? Login here
            </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp1