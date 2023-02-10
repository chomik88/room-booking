<template>
  <div>
    <PCard>
      <template #content>
        <div v-if="hotel">
          <div
            class="d-flex align-items-center justify-content-between mb-5 border-bottom pb-2"
          >
            <h1>{{ hotel?.name }}</h1>
            <div class="d-flex gap-3">
              <PButton
                label="Edit Hotel"
                @click="editHotel"
                class="p-button-help"
              />
              <PButton label="Add Rooms" @click="addNewRooms" />
              <PButton
                label="Remove Hotel"
                class="p-button-danger"
                @click="removeHotel"
              />
            </div>
          </div>
          <div class="description">
            {{ hotel?.description }}
          </div>
          <ul class="facilities" v-if="hotel.facilities">
            <li v-for="facility in hotel.facilities" :key="facility.value">
              {{ facility.name }}
            </li>
          </ul>
          <GalleryImages :images="images" :loading="galleryLoading" />
          <router-view></router-view>
        </div>
        <div v-else>
          <h1>This hotel doesn't exist</h1>
        </div>
      </template>
    </PCard>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useHotelsStore } from "@/stores/hotels";
import { getHotelImages } from "@/services/imagesService";
import GalleryImages from "@/components/layout/GalleryImages.vue";

export default {
  name: "HotelDetails",
  components: { GalleryImages },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const hotelsStore = useHotelsStore();
    const hotel = computed(() => hotelsStore.getHotelById(route.params.id));
    const images = ref<string[] | undefined>([]);
    const galleryLoading = ref(false);
    const getImages = async () => {
      if (hotel.value && hotel.value.images) {
        galleryLoading.value = true;
        const imgUrls = await getHotelImages(hotel.value.images);
        if (!imgUrls) return;
        images.value = imgUrls?.length > 0 ? imgUrls : undefined;
        galleryLoading.value = false;
      }
    };
    const addNewRooms = () => {
      router.push({ name: "add-hotel-room", params: { id: route.params.id } });
    };
    const removeHotel = () => {
      hotelsStore.removeHotel(route.params.id);
    };

    const editHotel = () => {
      router.push({ name: "edit-hotel", params: { id: route.params.id } });
    };

    onMounted(() => getImages());
    return {
      hotel,
      addNewRooms,
      removeHotel,
      editHotel,
      images,
      galleryLoading,
    };
  },
};
</script>
