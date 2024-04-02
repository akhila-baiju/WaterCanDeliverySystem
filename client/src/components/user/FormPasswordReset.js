import React, { Component } from "react";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from '@mui/joy/Box';
import Spinner from "./Spinner";
import Alert from "./Alert";
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
export default class FormPasswordReset extends Component {
  state = {
    passChangeSuccess: false
  };

  _handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false
    }));
  };

  _renderModal = () => {
    const onClick = () => {
      this.setState(() => ({ passChangeSuccess: false }));
    };

    return (
      <Alert
        isOpen={this.state.passChangeSuccess}
        onClose={this._handleClose}
        handleSubmit={onClick}
        title="Password Reset"
        text="Your password was changed successfully"
        submitButtonText="Done"
      />
    );
  };

  _handleSubmit = ({
    currentPass,
    newPass,
    confirmPass,
    setSubmitting,
    resetForm
  }) => {
    // fake async login
   
  };

  render() {
    return (
      <Box>
      
{/************************************************************************************* */}
<Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          // px: { xs: 2, md: 6 },
          // py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
           
            <Typography variant="title" >
        Reset Password 
      </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            alignSelf={"center"}
            spacing={3}
           // sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
            sx={{ maxWidth: 345 }}
          >
            
            <Formik
        initialValues={{
          currentPass: "",
          newPass: "",
          confirmPass: ""
        }}
        validationSchema={object().shape({
          currentPass: string().required("Current password is required"),
          newPass: string().required("New password is required"),
          confirmPass: string()
            .oneOf([ref("newPass")], "Passwords do not match")
            .required("Password is required")
        })}
        onSubmit={(
          { currentPass, newPass, confirmPass },
          { setSubmitting, resetForm }
        ) =>
          this._handleSubmit({
            currentPass,
            newPass,
            confirmPass,
            setSubmitting,
            resetForm
          })
        }
        render={props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting
          } = props;
          return isSubmitting ? (
            <Spinner />
          ) : (
            <Paper className="form form--wrapper" elevation={10}>
              <form className="form" onSubmit={handleSubmit}>
                <FormControl fullWidth margin="dense">
                  <InputLabel
                    htmlFor="password-current"
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  >
                    {"Current Password"}
                  </InputLabel>
                  <Input
                    id="password-current"
                    name="currentPass"
                    type="password"
                    value={values.currentPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  >
                    {touched.currentPass && errors.currentPass
                      ? errors.currentPass
                      : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.newPass && errors.newPass)}
                >
                  <InputLabel
                    htmlFor="password-new"
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {"New Password"}
                  </InputLabel>
                  <Input
                    id="password-new"
                    name="newPass"
                    type="password"
                    value={values.newPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.newPass && errors.newPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {touched.newPass && errors.newPass ? errors.newPass : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                >
                  <InputLabel
                    htmlFor="password-confirm"
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {"Confirm Password"}
                  </InputLabel>
                  <Input
                    id="password-confirm"
                    name="confirmPass"
                    type="password"
                    value={values.confirmPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {touched.confirmPass && errors.confirmPass
                      ? errors.confirmPass
                      : ""}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                   disabled={Boolean(!isValid || isSubmitting)}
                  style={{ margin: "16px" }}
                >
                  {"Reset Password"}
                </Button>
              </form>
              {this._renderModal()}
            </Paper>
          );
        }}
      /> 



            
            </Stack>
           
        </Card>
       </Stack> 

{/*************************************************************************************** */}
      </Box>
    );
    
  }
}
