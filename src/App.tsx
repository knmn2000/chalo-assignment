/*global google*/
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  Card,
  Dialog,
  createTheme,
  ThemeProvider,
  Typography,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  Tooltip,
  List,
  Snackbar,
  IconButton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import UploadIcon from "@mui/icons-material/Upload";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import RouteForm from "./components/RouteForm";
import { Route, Stop } from "./consts";
import RouteListItem from "./components/RouteListItem";
import StopList from "./components/StopList";
import CloseIcon from "@mui/icons-material/Close";

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

// TODO: refactor into components 
//       remove inline styles 
function App() {
  const card = useRef(null);
  const cardHeader = useRef(null);
  const [dialog, setDialog] = useState(false);
  const [routes, setRoutes] = useState<Array<Route>>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routeToEdit, setRouteToEdit] = useState<Route | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const [polylines, setPolylines] = useState<Array<google.maps.Polyline>>([]);
  const [markers, setMarkers] = useState<Array<google.maps.Marker>>([]);

  const handleDialogClose = () => {
    setDialog(false);
    setRouteToEdit(null);
  };
  const handleDialogOpen = () => {
    setDialog(true);
  };
  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route);
  };
  const handleEditRoute = (route: Route) => {
    setRouteToEdit(route);
    setDialog(true);
  };
  const selectStop = (stop: Stop) => {
    googleMaps.panTo({ lat: stop.latitude, lng: stop.longitude });
    googleMaps.setZoom(12);
  };
  const handleDeleteRoute = (route: Route) => {
    const newRoutes = routes.filter(
      (curRoute) => curRoute.routeid !== route.routeid
    );
    setRoutes(newRoutes);
    localStorage.setItem("routeList", JSON.stringify(newRoutes));
    setSelectedRoute(null);
    clearPolylines();
  };

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

  const addRoutePolylines = (route: Route) => {
    let polylineCoords: Array<google.maps.LatLngLiteral> = [];
    let markerArr: Array<google.maps.Marker> = [];
    route.listOfStops.forEach((stop) => {
      polylineCoords.push({ lat: stop.latitude, lng: stop.longitude });
      const marker = new google.maps.Marker({
        title: stop.stopName,
        position: { lat: stop.latitude, lng: stop.longitude },
        map: googleMaps,
      });
      markerArr.push(marker);
    });
    setMarkers([...markers, ...markerArr]);
    googleMaps.panTo(polylineCoords[0]);
    googleMaps.setZoom(10);
    const polyline = new google.maps.Polyline({
      path: polylineCoords,
      map: googleMaps,
      strokeColor: "#FF0000",
      strokeOpacity: 1,
      strokeWeight: 2,
    });
    setPolylines([...polylines, polyline]);
  };
  const clearPolylines = () => {
    polylines.forEach((polyline) => polyline.setMap(null));
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setPolylines([]);
  };
  const handleFileImport = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    if (e.target.files[0]) {
      fileReader.onload = function (event) {
        if (event && event.target && event.target.result) {
          localStorage.setItem("routeList", event.target.result.toString());
          setRoutes(JSON.parse(event.target.result.toString()));
        }
      };
    }
  };
  const handleExport = () => {
    if (routes.length === 0) {
      setSnackbarOpen(true);
    } else {
      const blob = new Blob([JSON.stringify(routes)], { type: "text/json" });
      const a = document.createElement("a");
      a.download = "routes.json";
      a.href = window.URL.createObjectURL(blob);
      const clickEvt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      a.dispatchEvent(clickEvt);
      a.remove();
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
    <div className="App">
      <ThemeProvider theme={theme}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message={"Nothing to export!"}
          action={action}
        />
        <div
          id="map"
          style={{ height: "100%", width: "100%", position: "absolute" }}
        />
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "fixed",
            pointerEvents: "none",
          }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%", width: "100%", padding: 0, margin: 0 }}
          >
            <Dialog
              // fullScreen
              open={dialog}
              onClose={handleDialogClose}
              TransitionComponent={Transition}
              style={{ flex: 1 }}
            >
              <RouteForm handleClose={handleDialogClose} route={routeToEdit} />
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
                      height: "60vh",
                      margin: 24,
                      display: "flex",
                      flexDirection: "column",
                      pointerEvents: "auto",
                    }}
                    ref={card}
                  >
                    <CardHeader
                      title="Routes"
                      titleTypographyProps={{ variant: "h4", align: "center" }}
                      ref={cardHeader}
                      action={
                        <IconButton
                          aria-label="Export routes"
                          onClick={handleExport}
                          size="large"
                        >
                          <OpenInNewIcon />
                        </IconButton>
                      }
                    />
                    <Divider />
                    <CardContent style={{ flex: 1, overflowY: "scroll" }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        direction="column"
                        style={{ height: "100%" }}
                      >
                        {routes.length > 0 ? (
                          <Grid item xs>
                            <List>
                              {routes.map((route) => {
                                return (
                                  <div onClick={() => addRoutePolylines(route)}>
                                    <RouteListItem
                                      route={route}
                                      handleSelectRoute={handleSelectRoute}
                                      handleDeleteRoute={handleDeleteRoute}
                                      handleEditRoute={handleEditRoute}
                                      key={route.routeid.toString()}
                                    />
                                  </div>
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
                  pointerEvents: "auto",
                }}
              >
                <StopList
                  selectedRoute={selectedRoute}
                  selectStop={selectStop}
                />
              </Grid>
            </Grid>
            <Tooltip title="Clear">
              <Fab
                color="primary"
                aria-label="clear"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  pointerEvents: "auto",
                }}
                onClick={clearPolylines}
              >
                <DeleteIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Upload routes">
              <Fab
                color="primary"
                aria-label="add"
                style={{
                  position: "absolute",
                  bottom: 90,
                  right: 16,
                  pointerEvents: "auto",
                }}
              >
                <input
                  type="file"
                  accept=".json"
                  id="route-upload"
                  style={{ opacity: 0, position: "fixed" }}
                  onChange={handleFileImport}
                />
                <UploadIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Create a new route">
              <Fab
                color="primary"
                aria-label="add"
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  pointerEvents: "auto",
                }}
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
