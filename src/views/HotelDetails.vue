<template>
  <div>
    <PCard>
      <template #content>
        <div v-if="hotel">
          <div
            class="d-flex align-items-center justify-content-between mb-5 border-bottom pb-2"
          >
            <h1>{{ hotel?.name }}</h1>
            <div class="d-flex gap-3">
              <PButton
                label="Remove Hotel"
                class="p-button-danger"
                @click="removeHotel"
              />
              <PButton label="Add Rooms" @click="addNewRooms" />
            </div>
          </div>
          <div class="description">
            {{ hotel?.description }}
          </div>
          <ul class="facilities" v-if="hotel.facilities">
            <li v-for="facility in hotel.facilities" :key="facility.value">
              {{ facility.name }}
            </li>
          </ul>
          <router-view></router-view>
        </div>
        <div v-else>
          <h1>This hotel doesn't exist</h1>
        </div>
      </template>
    </PCard>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useHotelsStore } from "@/stores/hotels";

export default {
  name: "HotelDetails",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const hotelsStore = useHotelsStore();
    const hotel = computed(() => hotelsStore.getHotelById(route.params.id));
    const addNewRooms = () => {
      router.push({ name: "add-hotel-room", params: { id: route.params.id } });
    };
    const removeHotel = async () => {
      await hotelsStore.removeHotel(route.params.id).then(() => {
        router.push({ name: "home" });
      });
    };
    return {
      hotel,
      addNewRooms,
      removeHotel,
    };
  },
};
</script>
