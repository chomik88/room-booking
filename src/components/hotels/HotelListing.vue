<template>
  <PCard>
    <template #content>
      <div
        class="d-flex align-items-center justify-content-between mb-5 pb-2 border-bottom"
      >
        <h1>List of hotels</h1>
        <PButton @click="goToAddNewHotel">Add new</PButton>
      </div>
      <div v-if="isLoading">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
      </div>
      <ul class="hotel-list" v-else>
        <HotelItem v-for="hotel in hotels" :key="hotel.id" :data="hotel" />
      </ul>
    </template>
  </PCard>
</template>

<script lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useHotelsStore } from "@/stores/hotels";
import HotelItem from "@/components/hotels/HotelItem.vue";

export default {
  name: "HotelListing",
  components: { HotelItem, ProgressSpinner },
  setup() {
    const router = useRouter();
    const hotelsStore = useHotelsStore();
    const isLoading = ref(false);
    const errorMsg = ref("");
    const hotels = computed(() => hotelsStore.getHotels);
    const goToAddNewHotel = () => {
      router.push({ name: "add-hotel" });
    };

    const loadHotels = async () => {
      isLoading.value = true;
      try {
        await hotelsStore.fetchHotels();
      } catch (error) {
        errorMsg.value =
          error instanceof Error ? error.message : "Something went wrong";
      }

      isLoading.value = false;
    };

    onMounted(() => {
      loadHotels();
    });

    return {
      hotels,
      isLoading,
      errorMsg,
      goToAddNewHotel,
    };
  },
};
</script>
