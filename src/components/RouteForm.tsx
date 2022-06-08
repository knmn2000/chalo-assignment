import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
type RouteFormProps = {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
};
export default function RouteForm({ handleClose }: RouteFormProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            align="center"
            variant="h6"
            component="div"
          >
            Create route
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid direction='column' container>
        <Grid
          container
          direction="row"
          style={{ padding: 24, margin: 24, flexFlow: 'row-reverse'}}
        >
                {/* TODO: USE STYLED TEXTFIELD */}
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent='center'
            alignItems="center"
          >
              <Grid item>
                <TextField label="Stop name" id="stop-name" variant="filled" style={{paddingRight:'16px'}}/>
              </Grid>
              <Grid item>
                <TextField label="Latitude" id="Latitude" variant="outlined" style={{paddingRight:'16px'}} />
              </Grid>
              <Grid item>
                <TextField label="Longitude" id="Longitude" variant="outlined" style={{paddingRight:'16px'}}/>
              </Grid>
              <Grid item>
                <IconButton color='primary'>
                  <AddIcon/>
                </IconButton>
              </Grid>
          </Grid> 
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent='center'
            alignItems="center"
          >
            <Grid item>
              <TextField label="Route name" id="route-name" variant="filled" style={{paddingRight:'16px'}} />
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel id="directions-row-buttons-group-label">
                Direction
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="directions-row-radio-buttons-group"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Up"
                    control={<Radio />}
                    label="Up"
                  />
                  <FormControlLabel value="Down" control={<Radio />} label="Down" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel id="directions-row-buttons-group-label">
                Status 
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="directions-row-radio-buttons-group"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent='center' alignItems='center'>
          <Box sx={{border: '2px dashed gray', borderRadius: '8px', alignSelf:'center'}}>
            hehaehf
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
