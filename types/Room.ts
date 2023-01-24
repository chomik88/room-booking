import type Facility from "./Facility";

type Room = {
  id?: string;
  name: string;
  capacity: number;
  description: string;
  images: [] | null;
  facilities: Facility[] | null;
  pricePerNight: number;
};

export default Room;
