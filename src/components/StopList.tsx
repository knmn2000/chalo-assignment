import { Card,Button, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Route } from "../consts";

type StopListProps = {
  selectedRoute: Route | null;
  selectStop: Function
};
export default function StopList({ selectedRoute, selectStop }: StopListProps) {
  // useEffect(() => {}, [selectedRoute]);
  return (
    // TODO: ADD arrow buttons to the sides. clicking on arrows should span to
    // the corresponding stop coordinates on the map
    // the active stop will have a green body(button body?) and the inactives
    // will be blue
    <Card style={{ display: "flex", width: "50%", height: "15vh", margin: 24, justifyContent:'space-around'}}>
      <CardContent style={{alignSelf: 'center'}}>
        {selectedRoute !== null ? (
          <Typography>
            {selectedRoute.listOfStops.map((stop, index) => {
              if (index === selectedRoute.listOfStops.length - 1) {
                return <Button
                          variant="contained"
                          size="small"
                          onClick={()=>selectStop(stop)}
                        >
                          {" "}
                          {stop.stopName}{" "}
                        </Button>;
              }
              return   <>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={()=>selectStop(stop)}
                        >
                          {" "}
                          {stop.stopName}{" "}
                        </Button>{" "}
                        {" --> "}
                      </>;
            })}
          </Typography>
        ) : (
          <Typography>{"No route selected"}</Typography>
        )}
      </CardContent>
    </Card>
  );
}
