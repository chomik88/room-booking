<template>
  <PCard>
    <template #content>
      <h1 class="mb-3">Edit hotel</h1>
      <EditHotelForm @error="showError" />
    </template>
  </PCard>
  <PToast></PToast>
</template>

<script lang="ts">
import EditHotelForm from "@/components/hotels/EditHotelForm.vue";
import { useErrors } from "@/composables/errors";

export default {
  name: "EditHotel",
  components: { EditHotelForm },
  setup() {
    const { showError } = useErrors();
    return {
      showError,
    };
  },
};
</script>
