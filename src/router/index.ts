import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddNewHotel from "@/views/AddNewHotel.vue";
import HotelDetails from "@/views/HotelDetails.vue";
import AddHotelRooms from "@/components/hotel-rooms/AddHotelRooms.vue";
import EditHotel from "@/views/EditHotel.vue";
import AppDictionaries from "@/views/AppDictionaries.vue";
import DictionaryWrapper from "@/components/dictionaries/DictionaryWrapper.vue";
import HotelRoomListing from "@/components/hotel-rooms/HotelRoomListing.vue";
import EditHotelRoom from "@/components/hotel-rooms/EditHotelRoom.vue";
import HotelRoomDetails from "@/components/hotel-rooms/HotelRoomDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/hotels/add",
      name: "add-hotel",
      component: AddNewHotel,
    },
    {
      path: "/hotels/:id",
      name: "hotel-details",
      component: HotelDetails,
      children: [
        {
          path: "rooms",
          name: "room-listing",
          component: HotelRoomListing,
        },
        {
          path: "add-room",
          name: "add-hotel-room",
          component: AddHotelRooms,
        },
        {
          path: "rooms/:roomId",
          name: "hotel-room-details",
          component: HotelRoomDetails,
        },
        {
          path: "rooms/:roomId/edit-room",
          name: "edit-hotel-room",
          component: EditHotelRoom,
        },
      ],
    },
    {
      path: "/hotels/:id/edit",
      name: "edit-hotel",
      component: EditHotel,
    },
    {
      path: "/dictionaries",
      name: "dictionaries",
      component: AppDictionaries,
      redirect: "/dictionaries/hotel-facilities",
      children: [
        {
          path: "hotel-facilities",
          name: "hotel-facilities",
          component: DictionaryWrapper,
        },
        {
          path: "room-facilities",
          name: "room-facilities",
          component: DictionaryWrapper,
        },
      ],
    },
  ],
});

export default router;
