<template>
  <form @submit.prevent="addHotel">
    <FormFieldWrapper>
      <InputText id="name" type="text" v-model="form.name" />
      <label for="name">Hotel name</label>
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
      name="images[]"
      :multiple="true"
      :custom-upload="true"
      @uploader="uploadImages"
      :show-upload-button="false"
      :show-cancel-button="false"
      ref="fileUploader"
    />
    <PButton label="Save Hotel" type="submit" class="mt-3" />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import FormFieldWrapper from "@/components/layout/FormFieldWrapper.vue";
import MultiSelect from "primevue/multiselect";
import { useHotelsStore } from "@/stores/hotels";
import FileUpload, {
  type FileUploadRemoveUploadedFile,
} from "primevue/fileupload";
import { uploadImagesService } from "@/services/imagesService";
import { useDictionariesStore } from "@/stores/dictionaries";

export default defineComponent({
  name: "AddHotelForm",
  components: { FormFieldWrapper, MultiSelect, FileUpload },
  setup(props: any, { emit }) {
    const hotelsStore = useHotelsStore();
    const dictionaryStore = useDictionariesStore();
    const fileUploader = ref();
    const hotelFacilities =
      dictionaryStore.getDictionaryByName("hotel-facilities")?.dictionaryItems;
    const form = reactive({
      name: "",
      description: "",
      images: [] as string[],
      facilities: null,
    });
    const mappedFacilities = hotelFacilities
      ? hotelFacilities.map((item) => ({ name: item.value, value: item.key }))
      : null;
    const facilities = ref(mappedFacilities);
    const hotelId = ref(null);

    const addHotel = async () => {
      try {
        const result = await hotelsStore.addHotel(form);
        hotelId.value = result.name;
        if (fileUploader.value.hasFiles) {
          fileUploader.value.upload();
        }
      } catch (error) {
        if (error instanceof Error) {
          emit("error", error.message);
        }
      }
    };

    const uploadImages = async (files: FileUploadRemoveUploadedFile) => {
      const result = await uploadImagesService(
        files.files,
        String(hotelId.value)
      );
      if (result && result.length) {
        form.images = result;
        await hotelsStore.updateHotel(form, String(hotelId.value));
      }
    };

    return {
      form,
      facilities,
      addHotel,
      uploadImages,
      fileUploader,
    };
  },
});
</script>
