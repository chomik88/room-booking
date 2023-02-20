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
import { useToast } from "primevue/usetoast";
export default {
  name: "AddNewHotel",
  components: { AddHotelForm },
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
