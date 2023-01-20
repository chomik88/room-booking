<template>
  <PCard>
    <template #content>
      <h1>Add new hotel</h1>
      <form @submit.prevent="addHotel">
        <FormFieldWrapper>
          <InputText id="name" type="text" v-model="form.name" />
          <label for="username">Hotel name</label>
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
        <FileUpload
          name="demo[]"
          url="./upload"
          :multiple="true"
          :custom-upload="true"
          @uploader="uploadImages"
          :show-upload-button="false"
          :show-cancel-button="false"
        />
        <PButton label="Submit" type="submit" />
      </form>
    </template>
  </PCard>
  <PToast></PToast>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import FormFieldWrapper from "@/components/layout/FormFieldWrapper.vue";
import MultiSelect from "primevue/multiselect";
import { useHotelsStore } from "@/stores/hotels";
import { useToast } from "primevue/usetoast";
import FileUpload from "primevue/fileupload";
export default {
  name: "AddNewHotel",
  components: { FormFieldWrapper, MultiSelect, FileUpload },
  setup() {
    const hotelsStore = useHotelsStore();
    const toast = useToast();
    const form = reactive({
      // id: "",
      name: "",
      description: "",
      images: null,
      facilities: null,
    });
    const facilities = ref([
      { name: "Meals", value: "meals" },
      { name: "Wi-Fi", value: "wi-fi" },
      { name: "Parking", value: "parking" },
      { name: "Minibar", value: "minibar" },
      { name: "Pets allowed", value: "pets-allowed" },
      { name: "TV", value: "tv" },
      { name: "Spa", value: "spa" },
    ]);

    const addHotel = async () => {
      try {
        await hotelsStore.addHotel(form);
      } catch (error) {
        if (error instanceof Error) {
          toast.add({
            severity: "error",
            summary: "Ops!",
            detail: error.message,
            life: 5000,
          });
        }
      }
    };

    const uploadImages = (e: Event) => {
      console.log(e);
    };

    return {
      form,
      facilities,
      addHotel,
      uploadImages,
    };
  },
};
</script>
