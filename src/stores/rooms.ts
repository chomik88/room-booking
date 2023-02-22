import { defineStore } from "pinia";
import type Room from "../../types/Room";
import { get, push, ref, remove, update } from "firebase/database";
import { db } from "@/firebaseConfig";

const roomsRef = ref(db, "rooms");
export const useRoomsStore = defineStore("rooms", {
  state: () => ({
    rooms: ([] as Room[]) || null,
  }),
  getters: {
    getRooms({ rooms }) {
      return rooms;
    },
    getRoomById({ rooms }) {
      return (id: string | string[]) => rooms.find((room) => room.id === id);
    },
  },
  actions: {
    async addHotelRoom(data: Room) {
      const response = await push(roomsRef, data);
      console.log(response);
    },
    async fetchHotelRooms(hotelId: string) {
      const response = await get(roomsRef);
      const responseData = response.val();
      const roomsArray = Object.keys(responseData).map((key) => ({
        id: key,
        ...responseData[key],
      }));
      this.rooms = roomsArray.filter((item: Room) => item.hotelId === hotelId);
    },
    async removeHotelRoom(id: string) {
      const hotelRoomRef = ref(db, "rooms/" + id);
      const hotelId = this.getRoomById(id)?.hotelId;
      await remove(hotelRoomRef);
      await this.fetchHotelRooms(String(hotelId));
    },
    async updateHotelRoom(data: Room, id: string) {
      const hotelRoomRef = ref(db, "rooms/" + id);
      await update(hotelRoomRef, data);
    },
  },
});
