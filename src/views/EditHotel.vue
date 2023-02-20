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
import { useToast } from "primevue/usetoast";

export default {
  name: "EditHotel",
  components: { EditHotelForm },
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
