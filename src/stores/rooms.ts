import { defineStore } from "pinia";
import type Room from "../../types/Room";

export const useRoomsStore = defineStore("rooms", {
  state: () => ({
    rooms: ([] as Room[]) || null,
  }),
  getters: {
    getRooms({ rooms }) {
      return rooms;
    },
  },
});
