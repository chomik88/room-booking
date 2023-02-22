<template>
  <div
    class="d-flex align-items-center justify-content-between mb-5 pb-2 border-bottom"
  >
    <h2 class="mb-3">Room: {{ room?.name }}</h2>
    <PButton @click="goBack">Go back</PButton>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRoomsStore } from "@/stores/rooms";

export default {
  name: "HotelRoomDetails",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const roomsStore = useRoomsStore();
    const room = computed(() =>
      roomsStore.getRoomById(String(route.params.roomId))
    );

    const goBack = () => {
      router.push({ name: "room-listing" });
    };
    return {
      room,
      goBack,
    };
  },
};
</script>
