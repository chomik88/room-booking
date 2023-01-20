import type Facility from "./Facility";

type Hotel = {
  id?: string;
  name: string;
  description: string;
  facilities: Facility[] | null;
  images: [] | null;
};

export default Hotel;
