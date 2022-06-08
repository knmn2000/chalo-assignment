import React from 'react'
import {AppBar ,
Toolbar,
Typography,
IconButton,
TextField,
Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
type RouteFormProps = {
    handleClose : React.MouseEventHandler<HTMLButtonElement>;
}
export default function RouteForm({handleClose} : RouteFormProps) {
  return (
    <div style={{display:'flex', flexDirection:'column', overflowX: 'hidden'}}>
         <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} align='center' variant="h6" component="div">
                Create route 
            </Typography>
          </Toolbar>
        </AppBar>
          <Grid container spacing={2} direction="column" style={{padding: 24, margin: 24}}>
              <Grid item>
              <TextField 
                label="Route name"
                id="route-name"
                variant="filled"
              />
              </Grid>
          </Grid>
    </div>
  )
}
