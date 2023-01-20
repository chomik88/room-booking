import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddNewHotel from "@/components/hotels/AddNewHotel.vue";
import HotelDetails from "@/components/hotels/HotelDetails.vue";
import AddHotelRooms from "@/components/hotels/AddHotelRooms.vue";

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
          path: "add-room",
          name: "add-hotel-room",
          component: AddHotelRooms,
        },
      ],
    },
  ],
});

export default router;
