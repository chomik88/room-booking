<template>
  <PCard>
    <template #content>
      <h1 class="mb-3">Add new hotel</h1>
      <AddHotelForm @error="showError" />
    </template>
  </PCard>
  <PToast></PToast>
</template>

<script lang="ts">
import AddHotelForm from "@/components/hotels/AddHotelForm.vue";
import { useErrors } from "@/composables/errors";
export default {
  name: "AddNewHotel",
  components: { AddHotelForm },
  setup() {
    const { showError } = useErrors();
    return {
      showError,
    };
  },
};
</script>
