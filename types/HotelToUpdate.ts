import type Hotel from "./Hotel";

type HotelToUpdate = Hotel & {
  imagesToRemove?: string[] | null;
};

export default HotelToUpdate;
