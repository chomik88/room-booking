<template>
  <li class="hotel-item">
    <h3>{{ hotel.name }}</h3>
    <PButton
      label="Show details"
      class="button--small"
      @click="showHotelDetails(hotel.id)"
    />
  </li>
</template>

<script lang="ts">
import type Hotel from "../../../types/Hotel";
import type { PropType } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "HotelItem",
  props: {
    data: {
      type: Object as PropType<Hotel>,
    },
  },
  setup(props: any) {
    const router = useRouter();
    const hotel = ref(props.data);

    const showHotelDetails = (id: string) => {
      router.push({ name: "hotel-details", params: { id } });
    };

    return {
      hotel,
      showHotelDetails,
    };
  },
};
</script>
