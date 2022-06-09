export type RouteFormProps = {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
};
export type Stop = {
  stopid: Number;
  stopName: String;
  latitude: Number;
  longitude: Number;
};
export type RouteStatus = "active" | "inactive"
export type RouteDirection = "up" | "down";
export type Route = {
  name: String;
  direction: RouteDirection;
  routeid: Number;
  status: RouteStatus;
  listOfStops: Array<Stop>;
};