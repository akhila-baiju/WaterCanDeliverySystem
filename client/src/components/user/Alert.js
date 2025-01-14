import React from "react";
//import DialogTitle from '@mui/material/DialogTitle';
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
//import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
//import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from "@mui/material/DialogContent";
//import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from '@mui/material/DialogTitle';
//import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@mui/material/Button";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default function Alert({
  handleClose,
  handleSubmit,
  isOpen,
  hasTwoButtons = false,
  submitButtonText,
  title,
  text
}) {
  return (
    <Dialog
      open={isOpen}
      transition={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {hasTwoButtons ? (
          <Button onClick={handleClose} variant="raised" color="primary">
            {"CANCEL"}
          </Button>
        ) : null}
        <Button onClick={handleSubmit} color="primary">
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
