import React, { useMemo, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Card,
  Dialog,
  createTheme,
  ThemeProvider,
  Typography,
  ListItemText,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  Tooltip,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import RouteForm from "./components/RouteForm";
import { Route } from "./consts";
import RouteListItem from "./components/RouteListItem";

let googleMaps: google.maps.Map;
const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const card = useRef(null);
  const cardHeader = useRef(null);
  const [dialog, setDialog] = useState(false);
  const [routes, setRoutes] = useState<Array<Route>>([]);
  const polylineCoords = [
    { lat: 28.69980739308241, lng: 76.91092105942872 },
    { lat: 28.699321614422008, lng: 76.91182689430835 },
    { lat: 28.69888500171263, lng: 76.91152195979582 },
    { lat: 28.699372749118492, lng: 76.91062509357836 },
  ];
  useEffect(() => {
    googleMaps = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 28.69980739308241, lng: 76.91092105942872 },
        zoom: 8,
        disableDefaultUI: true,
      }
    );
    const localStorageRoutes = localStorage.getItem("routeList");
    if (localStorageRoutes) {
      setRoutes(JSON.parse(localStorageRoutes));
    }
  }, [dialog]);
  const clickHandler = () => {
    new google.maps.Marker({
      position: { lat: 28.69980739308241, lng: 76.91092105942872 },
      map: googleMaps,
      title: "brrr",
    });
  };
  const clickHandler2 = () => {
    new google.maps.Polyline({
      path: polylineCoords,
      map: googleMaps,
      strokeColor: "#FF0000",
      strokeOpacity: 1,
      strokeWeight: 2,
    });
  };
  const handleDialogClose = () => {
    setDialog(false);
  };
  const handleDialogOpen = () => {
    setDialog(true);
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <div id='map' style={{height:'100%', width: '100%', position: "absolute"}}/> */}
        <div id="map" style={{ display: "none" }} />
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            backgroundColor: "grey",
          }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%", width: "100%", padding: 0, margin: 0 }}
          >
            <Dialog
              fullScreen
              open={dialog}
              onClose={handleDialogClose}
              TransitionComponent={Transition}
              style={{ flex: 1 }}
            >
              <RouteForm handleClose={handleDialogClose} />
            </Dialog>
            <Grid item xs={1} />
            <Grid
              container
              xs
              direction="column"
              justifyContent="space-between"
            >
              <Grid container xs>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      width: "50%",
                      height: "90%",
                      margin: 24,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    ref={card}
                  >
                    <CardHeader
                      title="Routes"
                      titleTypographyProps={{ variant: "h4", align: "center" }}
                      ref={cardHeader}
                    />
                    <Divider />
                    <CardContent style={{ flex: 1 }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        direction="column"
                        style={{ height: "100%" }}
                      >
                        {routes.length > 0 ? (
                          <Grid item xs>
                            <List>
                              {/* refactor secondary to another component */}
                              {routes.map((route) => {
                                return (
                                  <RouteListItem route={route}/>
                                );
                              })}
                            </List>
                          </Grid>
                        ) : (
                          <>
                            <Grid item xs />
                            <Grid item xs>
                              <Typography align="center">
                                No routes added yet, click on the + button to
                                add a route.
                              </Typography>
                            </Grid>
                            <Grid item xs />
                          </>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 16,
                }}
              >
                <Card style={{ width: "50%", height: "100%", margin: 24 }} />
              </Grid>
            </Grid>
            <Tooltip title="Create a new route">
              <Fab
                color="primary"
                aria-label="add"
                style={{ position: "absolute", bottom: 16, right: 16 }}
                onClick={handleDialogOpen}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
