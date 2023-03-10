import type Facility from "./Facility";

type Hotel = {
  id?: string;
  name: string;
  description: string;
  facilities: Facility[] | null;
  images: string[] | null;
};

export default Hotel;
