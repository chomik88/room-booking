<template>
  <PCard>
    <template #content>
      <h1 class="mb-3">Add new hotel</h1>
      <HotelForm @error="showError" />
    </template>
  </PCard>
  <PToast></PToast>
</template>

<script lang="ts">
import HotelForm from "@/components/hotels/HotelForm.vue";
import { useToast } from "primevue/usetoast";
export default {
  name: "AddNewHotel",
  components: { HotelForm },
  setup() {
    const toast = useToast();
    const showError = (message: string) => {
      toast.add({
        severity: "error",
        summary: "Ops!",
        detail: message,
        life: 5000,
      });
    };
    return {
      showError,
    };
  },
};
</script>
