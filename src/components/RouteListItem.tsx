import React from "react";
import {
  Typography,
  ListItemText,
  ListItem,
  IconButton,
  Divider,
  ListItemButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Route } from "./../consts";
type RouteListItemProps = {
  route: Route;
  handleSelectRoute: Function;
  handleDeleteRoute: Function;
  handleEditRoute: Function;
};
export default function RouteListItem({
  route,
  handleSelectRoute,
  handleDeleteRoute,
  handleEditRoute,
}: RouteListItemProps) {
  return (
    <>
      <ListItemButton onClick={() => handleSelectRoute(route)}>
        <ListItem
          secondaryAction={
            <>
              <IconButton
                edge="end"
                aria-label="edit"
                style={{ marginRight: "4px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditRoute(route);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRoute(route);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemText
            primary={route.name}
            secondary={
              <Typography variant="body2" color="rgba(0, 0, 0, 0.67)">
                {route.listOfStops.length} Stops
              </Typography>
            }
          />
        </ListItem>
      </ListItemButton>
      <Divider />
    </>
  );
}
