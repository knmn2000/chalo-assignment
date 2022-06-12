export type RouteFormProps = {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
};
export type Stop = {
  stopid: Number;
  stopName: string;
  latitude: number;
  longitude:number;
};
export type RouteStatus = "active" | "inactive"
export type RouteDirection = "up" | "down";
export type Route = {
  name: string;
  direction: RouteDirection;
  routeid: number;
  status: RouteStatus;
  listOfStops: Array<Stop>;
};