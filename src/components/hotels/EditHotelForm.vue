<template>
  <form @submit.prevent="updateHotel">
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
    <GalleryImages
      :images="galleryImages"
      :loading="galleryLoading"
      :editing="true"
      @imageAddedToRemove="addImageToRemove"
    />
    <FileUpload
      name="images[]"
      :multiple="true"
      :custom-upload="true"
      @uploader="uploadImages"
      :show-upload-button="false"
      :show-cancel-button="false"
      ref="fileUploader"
    />
    <PButton label="Save changes" type="submit" class="mt-3" />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import FormFieldWrapper from "@/components/layout/FormFieldWrapper.vue";
import MultiSelect from "primevue/multiselect";
import { useHotelsStore } from "@/stores/hotels";
import { useDictionariesStore } from "@/stores/dictionaries";
import { useRoute, useRouter } from "vue-router";
import FileUpload, {
  type FileUploadRemoveUploadedFile,
} from "primevue/fileupload";
import {
  getHotelImages,
  removeImages,
  uploadImagesService,
} from "@/services/imagesService";
import GalleryImages from "@/components/layout/GalleryImages.vue";

export default defineComponent({
  name: "EditHotelForm",
  components: { FormFieldWrapper, MultiSelect, FileUpload, GalleryImages },
  setup(props: any, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const hotelsStore = useHotelsStore();
    const dictionaryStore = useDictionariesStore();
    const getHotelData = computed(() =>
      hotelsStore.getHotelById(route.params.id)
    );
    const fileUploader = ref();
    const galleryLoading = ref(false);
    const hotelFacilities =
      dictionaryStore.getDictionaryByName("hotel-facilities")?.dictionaryItems;
    const form = reactive({
      name: getHotelData.value ? getHotelData.value?.name : "",
      description: getHotelData.value ? getHotelData.value?.description : "",
      images: getHotelData.value ? getHotelData.value?.images : [],
      facilities: getHotelData.value ? getHotelData.value?.facilities : [],
      imagesToRemove: [] as string[],
    });
    const galleryImages = ref([] as string[]);
    const mappedFacilities = hotelFacilities
      ? hotelFacilities.map((item) => ({ name: item.value, value: item.key }))
      : null;
    const facilities = ref(mappedFacilities);

    const updateHotel = async () => {
      try {
        await hotelsStore.updateHotel(form, String(route.params.id));
        if (fileUploader.value.hasFiles) {
          fileUploader.value.upload();
        } else if (form.imagesToRemove.length) {
          await handleRemoveImages(form.imagesToRemove);
        } else {
          returnToDetails();
        }
      } catch (error) {
        if (error instanceof Error) {
          emit("error", error.message);
        }
      }
    };

    const returnToDetails = () => {
      router.push({
        name: "hotel-details",
        params: { id: route.params.id },
      });
    };

    const uploadImages = async (files: FileUploadRemoveUploadedFile) => {
      const result = await uploadImagesService(
        files.files,
        String(route.params.id)
      );
      if (result && result.length) {
        if (form.images) {
          form.images = [...form.images, ...result];
        } else {
          form.images = result;
        }
        await hotelsStore.updateHotel(form, String(route.params.id));
        returnToDetails();
      }
    };

    const handleRemoveImages = async (images: string[]) => {
      const result = await removeImages(images);
      if (form.images && form.images.length) {
        const imagesToRemove = [] as string[];
        result.map((image) => {
          const imageStringManipulated = image.replace(/%2F/g, "/");

          const imageToRemove = form.images?.find(
            (formImage) => imageStringManipulated.indexOf(formImage) > -1
          );
          if (imageToRemove) {
            imagesToRemove.push(imageToRemove);
          }
        });
        form.images = form.images.filter(
          (img) => !imagesToRemove.includes(img)
        );
      }
      form.imagesToRemove = [];
      await hotelsStore.updateHotel(form, String(route.params.id));
      returnToDetails();
    };

    const getImages = async () => {
      if (getHotelData.value && getHotelData.value.images) {
        galleryLoading.value = true;
        const imgUrls = await getHotelImages(getHotelData.value?.images);
        if (!imgUrls) return;
        galleryImages.value = imgUrls;
        galleryLoading.value = false;
      }
    };

    const addImageToRemove = (image: string) => {
      form.imagesToRemove.push(image);
    };

    onMounted(() => getImages());

    return {
      form,
      galleryImages,
      facilities,
      updateHotel,
      uploadImages,
      fileUploader,
      galleryLoading,
      addImageToRemove,
    };
  },
});
</script>
