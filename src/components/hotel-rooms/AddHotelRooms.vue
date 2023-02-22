<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-between mb-5 pb-2 border-bottom"
    >
      <h2 class="mb-3">Add Rooms to hotel:</h2>
      <PButton @click="goBack">Go back</PButton>
    </div>
    <form @submit.prevent="addHotelRoom">
      <FormFieldWrapper>
        <InputText id="name" type="text" v-model="form.name" />
        <label for="name">Room name</label>
      </FormFieldWrapper>
      <FormFieldWrapper>
        <InputNumber
          id="capacity"
          v-model="form.capacity"
          mode="decimal"
          showButtons
        />
        <label for="capacity">Room capacity</label>
      </FormFieldWrapper>
      <FormFieldWrapper>
        <PTextarea
          id="description"
          v-model="form.description"
          rows="5"
          cols="30"
        />
        <label for="description">Description</label>
      </FormFieldWrapper>
      <FormFieldWrapper>
        <MultiSelect
          v-model="form.facilities"
          :options="facilities"
          optionLabel="name"
          placeholder="Select Facilities"
          display="chip"
          inputId="facilities"
        />
        <label for="facilities">Facilities</label>
      </FormFieldWrapper>
      <FormFieldWrapper>
        <InputNumber
          id="pricePerNight"
          v-model="form.pricePerNight"
          mode="currency"
          currency="EUR"
        />
        <label for="pricePerNight">Price per night</label>
      </FormFieldWrapper>
      <PButton label="Save Room" type="submit" class="mt-3" />
    </form>
  </div>
</template>

<script lang="ts">
import { useRoomsStore } from "@/stores/rooms";
import { reactive, ref } from "vue";
import FormFieldWrapper from "@/components/layout/FormFieldWrapper.vue";
import { useDictionariesStore } from "@/stores/dictionaries";
import MultiSelect from "primevue/multiselect";
import { useRoute } from "vue-router";
import router from "@/router";

export default {
  name: "AddHotelRooms",
  components: { FormFieldWrapper, MultiSelect },
  setup() {
    const route = useRoute();
    const roomsStore = useRoomsStore();
    const dictionaryStore = useDictionariesStore();
    const roomFacilities =
      dictionaryStore.getDictionaryByName("room-facilities")?.dictionaryItems;
    const form = reactive({
      hotelId: String(route.params.id),
      name: "",
      capacity: 0,
      description: "",
      images: [] as string[],
      facilities: null,
      pricePerNight: 0,
    });

    const mappedFacilities = roomFacilities
      ? roomFacilities.map((item) => ({ name: item.value, value: item.key }))
      : null;
    const facilities = ref(mappedFacilities);

    const addHotelRoom = () => {
      roomsStore.addHotelRoom(form);
    };

    const goBack = () => {
      router.push({ name: "room-listing" });
    };

    return {
      addHotelRoom,
      form,
      facilities,
      goBack,
    };
  },
};
</script>
