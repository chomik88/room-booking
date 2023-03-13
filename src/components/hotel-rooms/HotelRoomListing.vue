<template>
  <div
    class="d-flex align-items-center justify-content-between mb-5 pb-2 border-bottom"
  >
    <h3>List of rooms</h3>
    <PButton @click="goToAddNewRoom">Add new</PButton>
  </div>
  <div v-if="isLoading">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
  </div>
  <div v-else>
    <DataTable :value="rooms">
      <Column field="name" header="Name"></Column>
      <Column field="capacity" header="Capacity"></Column>
      <Column field="pricePerNight" header="Price"></Column>
      <Column
        field="actions"
        header="Actions"
        class="d-flex justify-content-end"
      >
        <template #body="slotProps">
          <div class="d-flex gap-2 justify-content-end">
            <PButton
              label="Details"
              class="p-button"
              @click="showRoom(slotProps.data.id)"
            />
            <PButton
              label="Edit"
              class="p-button-help"
              @click="editRoom(slotProps.data.id)"
            />
            <PButton
              label="Remove"
              class="p-button-danger"
              @click="removeRoom(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { useRoomsStore } from "@/stores/rooms";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useErrors } from "@/composables/errors";
import { useConfirm } from "primevue/useconfirm";

export default {
  name: "HotelRoomListing",
  components: { ProgressSpinner, DataTable, Column },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const roomsStore = useRoomsStore();
    const isLoading = ref(false);
    const errorMsg = ref("");
    const confirm = useConfirm();
    const { showError } = useErrors();
    const rooms = computed(() => roomsStore.getRooms);
    const goToAddNewRoom = () => {
      router.push({ name: "add-hotel-room" });
    };

    const loadRooms = async () => {
      isLoading.value = true;
      try {
        await roomsStore.fetchHotelRooms(String(route.params.id));
      } catch (error) {
        errorMsg.value =
          error instanceof Error ? error.message : "Something went wrong";
      }

      isLoading.value = false;
    };

    const editRoom = (id: string) => {
      router.push({ name: "edit-hotel-room", params: { roomId: id } });
    };

    const showRoom = (id: string) => {
      router.push({ name: "hotel-room-details", params: { roomId: id } });
    };

    const removeRoom = (id: string) => {
      confirm.require({
        message: "Are you sure you want to delete this room?",
        header: "Confirmation",
        accept: async () => {
          try {
            await roomsStore.removeHotelRoom(id);
          } catch (error) {
            showError(
              error instanceof Error ? error.message : "Something went wrong"
            );
          }
        },
      });
    };

    onMounted(() => {
      loadRooms();
    });

    return {
      goToAddNewRoom,
      isLoading,
      rooms,
      editRoom,
      removeRoom,
      showRoom,
    };
  },
};
</script>
