<template>
  <div class="gallery" v-if="!loading">
    <div class="gallery__item" v-for="image in images" :key="image">
      <img :src="image" alt="" />
    </div>
  </div>
  <div v-else>
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
  </div>
</template>

<script lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import type { PropType } from "vue";

export default {
  name: "GalleryImages",
  props: {
    images: {
      type: Array as PropType<string[]>,
    },
    loading: {
      type: Boolean,
    },
  },
  components: { ProgressSpinner },
};
</script>
