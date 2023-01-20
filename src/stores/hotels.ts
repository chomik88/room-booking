import { defineStore } from "pinia";
import type Hotel from "../../types/Hotel";

export const useHotelsStore = defineStore("hotels", {
  state: () => ({
    hotels: ([] as Hotel[]) || null,
  }),
  getters: {
    getHotels({ hotels }) {
      return hotels;
    },
    getHotelById({ hotels }) {
      return (id: string | string[]) => hotels.find((hotel) => hotel.id === id);
    },
  },
  actions: {
    async fetchHotels() {
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_URL}/hotels.json`
      );
      const data = await response.json();
      this.hotels = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
    },

    async addHotel(data: Hotel) {
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_URL}/hotels.json`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to send request."
        );
        throw error;
      }

      this.hotels.push({
        ...data,
        id: responseData.name,
      });
    },

    async removeHotel(id: string | string[]) {
      await fetch(`${import.meta.env.VITE_FIREBASE_URL}/hotels/${id}.json`, {
        method: "DELETE",
      });
    },
  },
});
