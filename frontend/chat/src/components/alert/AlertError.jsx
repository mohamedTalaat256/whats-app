

// @mui
import { Alert, IconButton, Collapse} from '@mui/material';
import { useState } from 'react';


export default function AlertError(props){
  const [open, setOpen] = useState(true);
    return(
        <>
        <Collapse in={open}>
        <Alert
        color="error"
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
             x
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Fail To Add Data
        </Alert>
      </Collapse>
        </>
    );
}