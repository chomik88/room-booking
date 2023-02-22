import type Facility from "./Facility";

type Room = {
  id?: string;
  hotelId: string;
  name: string;
  capacity: number;
  description: string;
  images: string[] | null;
  facilities: Facility[] | null;
  pricePerNight: number;
};

export default Room;
