import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Chip,
  IconButton,
  TextField,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import {Stop, RouteStatus, RouteDirection, Route} from './../consts';
type RouteFormProps = {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
};

export default function RouteForm({ handleClose }: RouteFormProps) {
  const [stops, setStops] = useState<Array<Stop>>([]);
  const [stopName, setStopName] = useState<String>('');
  const [stopLongitude, setStopLongitude] = useState<String>();
  const [stopLatitude, setStopLatitude] = useState<String>();

  
  const [routeName, setRouteName] = useState<String>('');
  const [direction, setDirection] = useState<RouteDirection>('up');
  const [status, setStatus] = useState<RouteStatus>('active');

  const handleAddStops = () => {
      const stop: Stop = {
        stopName,
        // can be replaced with UUID
        stopid: Math.floor(Math.random() * 100000),
        latitude: Number(stopLatitude),
        longitude: Number(stopLongitude),
      };
      console.log(stopName, stopLatitude, stopLongitude);
      setStops([...stops, stop]);
  };
  const handleAddRoute = () => {
    const route: Route ={
      name: routeName,
      listOfStops: stops,
      routeid: Math.floor(Math.random() * 100000),
      direction,
      status,
    }
    const routeList = localStorage.getItem('routeList');
    if(routeList){
     localStorage.setItem('routeList', JSON.stringify([...JSON.parse(routeList), route])) 
    }else{
     localStorage.setItem('routeList', JSON.stringify([route])) 
    };
    console.log(route);
  };
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
      <Grid direction="column" container>
        <Grid
          container
          direction="row"
          // todo: reverse order of comps and change row-reverse to row
          style={{ padding: 24, margin: 24, flexFlow: "row-reverse" }}
        >
          {/* TODO: USE STYLED TEXTFIELD */}
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <TextField
                label="Stop name"
                id="stop-name"
                variant="filled"
                style={{ paddingRight: "16px" }}
                onChange={(e) => setStopName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Latitude"
                id="Latitude"
                variant="outlined"
                style={{ paddingRight: "16px" }}
                onChange={(e) => setStopLatitude(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Longitude"
                id="Longitude"
                variant="outlined"
                style={{ paddingRight: "16px" }}
                onChange={(e) => setStopLongitude(e.target.value)}
              />
            </Grid>
            <Grid item>
              <IconButton color="primary" onClick={handleAddStops}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <TextField
                label="Route name"
                id="route-name"
                variant="filled"
                style={{ paddingRight: "16px" }}
                onChange={(e)=>{setRouteName(e.target.value)}}
              />
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
                  value={direction}
                  onChange={(e)=>setDirection(e.target.value as RouteDirection)}
                >
                  <FormControlLabel value="up" control={<Radio />} label="Up" />
                  <FormControlLabel
                    value="down"
                    control={<Radio />}
                    label="Down"
                  />
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
                  onChange={(e)=>setStatus(e.target.value as RouteStatus)}
                >
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="inactive"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Box
            sx={{
              border: "2px dashed gray",
              borderRadius: "8px",
              padding: "8px",
              alignSelf: "center",
            }}
          >
            {stops.length > 0 ? (
              <>
              <Typography>
                {stops.map((stop, index) => {
                  if(index === stops.length - 1){
                    return stop.stopName;
                  }
                  return stop.stopName + " -> ";
                })}
              </Typography>
              </>
            ) : (
              <Typography>No stops added</Typography>
            )}
          </Box>
        </Grid>
        <Grid item justifyContent="center" alignSelf="center">
          <Button
            variant="contained"
            style={{ padding: "8px", margin: "8px" }}
            color="primary"
            onClick={handleAddRoute}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
