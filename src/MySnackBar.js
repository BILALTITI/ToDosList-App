import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from '@mui/material/Alert';

export default function SimpleSnackbar({Open,message}) {
 
  const handleClick = () => {
   };

  const handleClose = (Event, reason) => {
    if (reason === "clickaway") {
      return;
    }

   };

  const action = (
    <React.Fragment>
    
     
      </React.Fragment>
  );

  return (
    <div>
      <Snackbar
         open={Open}
        autoHideDuration={6000}
         message="Note archived"
        action={action}
      >

<Alert
   // onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' ,direction:"ltr"}}
  >
   {message}
  </Alert>
      </Snackbar>
    </div>
  );
}
