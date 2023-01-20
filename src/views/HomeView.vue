<script lang="ts">
import { defineComponent } from "vue";
import HotelListing from "@/components/hotels/HotelListing.vue";

export default defineComponent({
  components: { HotelListing },
});
</script>

<template>
  <main>
    <HotelListing />
  </main>
</template>
