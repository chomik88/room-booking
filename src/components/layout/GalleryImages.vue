<template>
  <div class="gallery mt-4 mb-4" v-if="!loading">
    <div
      class="gallery__item"
      v-for="image in images"
      :key="image"
      @click="toggleToRemove($event, image)"
    >
      <img :src="image" alt="" />
      <i class="pi pi-trash" style="font-size: 1.5rem"></i>
    </div>
  </div>
  <div v-else>
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
  </div>
</template>

<script lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import type { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GalleryImages",
  props: {
    images: {
      type: Array as PropType<string[]>,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
    },
  },
  components: { ProgressSpinner },
  setup(props: any, { emit }) {
    const toggleToRemove = (e: Event, image: string) => {
      if (!props.editing) return;
      const eventTarget = e.target as HTMLElement;
      if (eventTarget) {
        eventTarget.parentElement?.classList.toggle("gallery__item--selected");
        emit("imageAddedToRemove", image);
      }
    };

    return {
      toggleToRemove,
    };
  },
});
</script>
