import React from "react";
import {
  Typography,
  ListItemText,
  ListItem,
  IconButton,
  Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Route} from './../consts';
type RouteListItemProps = {
    route : Route;
}
export default function RouteListItem({route}: RouteListItemProps) {
  return (
    <>
      <ListItem
        secondaryAction={
            <>
          <IconButton edge="end" aria-label="edit" style={{marginRight: '4px'}}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="edit">
            <DeleteIcon/>
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
      <Divider />
    </>
  );
}
