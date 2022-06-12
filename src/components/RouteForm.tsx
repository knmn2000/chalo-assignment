import React, { useEffect, useState, useRef, useCallback } from "react";
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
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { Stop, RouteStatus, RouteDirection, Route } from "./../consts";
type RouteFormProps = {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  route: Route | null;
};

export default function RouteForm({ handleClose, route }: RouteFormProps) {
  const [stops, setStops] = useState<Array<Stop>>([]);
  const [stopName, setStopName] = useState<string>("");
  const [stopLongitude, setStopLongitude] = useState<string>("");
  const [stopLatitude, setStopLatitude] = useState<string>("");
  // -1 implies no stop is being edited currently
  const [stopId, setStopId] = useState<Number>(-1);

  const [routeName, setRouteName] = useState<string>("");
  const [direction, setDirection] = useState<RouteDirection>("up");
  const [status, setStatus] = useState<RouteStatus>("active");

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("Error");

  const handleAddStops = () => {
    if (stopName !== "" && stopLatitude !== "" && stopLongitude !== "") {
      if (stopId !== -1) {
        let editedStops = stops;
        editedStops.map((stop, idx) => {
          if (stop.stopid === stopId) {
            stop.stopName = stopName;
            stop.latitude = Number(stopLatitude);
            stop.longitude = Number(stopLongitude);
          }
        });
        setStops(editedStops);
        setStopId(-1);
        return;
      }
      const stop: Stop = {
        stopName,
        // can be replaced with UUID
        stopid: Math.floor(Math.random() * 100000),
        latitude: Number(stopLatitude),
        longitude: Number(stopLongitude),
      };
      setStops([...stops, stop]);
      setStopName("");
      setStopLatitude("");
      setStopLongitude("");
    } else {
      setSnackbarMessage("Please fill all the fields");
      setSnackbarOpen(true);
    }
  };
  const selectStop = (stop: Stop) => {
    setStopName(stop.stopName);
    setStopLatitude(stop.latitude.toString());
    setStopLongitude(stop.longitude.toString());
    setStopId(stop.stopid);
  };
  useEffect(() => {
    if (route !== null) {
      setRouteName(route.name);
      setDirection(route.direction);
      setStatus(route.status);
      setStops(route.listOfStops);
    }
  }, [route, stops, stopId]);
  const handleAddRoute = () => {
    const routeList = localStorage.getItem("routeList");
    if (stops.length === 0) {
      setSnackbarMessage("No stops added");
      setSnackbarOpen(true);
    } else {
      if (route !== null && routeList !== null) {
        let editedRoutes = JSON.parse(routeList);
        editedRoutes.map((currRoute: Route) => {
          if (currRoute.routeid === route.routeid) {
            currRoute.name = routeName;
            currRoute.direction = direction;
            currRoute.status = status;
          }
        });
        localStorage.setItem("routeList", JSON.stringify([editedRoutes]));
      } else {
        const newRoute: Route = {
          name: routeName,
          listOfStops: stops,
          routeid: Math.floor(Math.random() * 100000),
          direction,
          status,
        };
        if (routeList) {
          localStorage.setItem(
            "routeList",
            JSON.stringify([...JSON.parse(routeList), newRoute])
          );
        } else {
          localStorage.setItem("routeList", JSON.stringify([newRoute]));
        }
        console.log(newRoute);
      }
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div
      style={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={action}
      />
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{flex: 1, justifyContent:'start'}}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 4, flex: 4 }}
            align="center"
            variant="h6"
            component="div"
          >
            {route === null ? "Create route" : "Edit route"}
          </Typography>
          <Button
          variant="contained"
            aria-label="close"
            color="success"
            style={{flex: 1}}
              onClick={handleAddRoute}
          >
               {route === null ? "Create" : "Edit"}
          </Button>
        </Toolbar>
      </AppBar>
      <Grid direction="column" container>
        <Grid
          container
          direction="row"
          style={{ padding: 24, margin: 16, flexFlow: "row" }}
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
                label="Route name"
                id="route-name"
                variant="filled"
                style={{ paddingRight: "16px" }}
                value={routeName}
                onChange={(e) => {
                  setRouteName(e.target.value);
                }}
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
                  onChange={(e) =>
                    setDirection(e.target.value as RouteDirection)
                  }
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
                  value={status}
                  onChange={(e) => setStatus(e.target.value as RouteStatus)}
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
            <Grid item>
              <Box style={{margin: '20px'}}/>
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
                label="Stop name"
                id="stop-name"
                variant="filled"
                style={{ paddingRight: "16px" }}
                value={stopName}
                onChange={(e) => setStopName(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Latitude"
                id="Latitude"
                variant="outlined"
                style={{ paddingRight: "16px" }}
                value={stopLatitude}
                onChange={(e) => setStopLatitude(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Longitude"
                id="Longitude"
                variant="outlined"
                style={{ paddingRight: "16px" }}
                value={stopLongitude}
                onChange={(e) => setStopLongitude(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <IconButton color="primary" onClick={handleAddStops}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" >
          <Box
            sx={{
              border: "2px dashed gray",
              borderRadius: "8px",
              padding: "8px",
              alignSelf: "center",
              margin: '16px'
            }}
          >
            {stops.length > 0 ? (
              <>
                <Typography>
                  {stops.map((stop, index) => {
                    if (index === stops.length - 1) {
                      return (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => selectStop(stop)}
                        >
                          {" "}
                          {stop.stopName}{" "}
                        </Button>
                      );
                    }
                    return (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => selectStop(stop)}
                        >
                          {" "}
                          {stop.stopName}{" "}
                        </Button>{" "}
                        {" --> "}
                      </>
                    );
                  })}
                </Typography>
              </>
            ) : (
              <Typography>No stops added</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
