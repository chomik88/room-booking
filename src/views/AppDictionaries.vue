<template>
  <div v-if="isLoading">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
  </div>
  <div v-else>
    <TabMenu :model="items" />
    <router-view @valuesChanged="loadDictionaries"></router-view>
  </div>
</template>

<script lang="ts">
import { useDictionariesStore } from "@/stores/dictionaries";
import ProgressSpinner from "primevue/progressspinner";
import TabMenu from "primevue/tabmenu";
import { onMounted, ref } from "vue";
export default {
  name: "AppDictionaries",
  components: { TabMenu, ProgressSpinner },
  setup() {
    const isLoading = ref(false);
    const errorMsg = ref("");
    const dictionariesStore = useDictionariesStore();
    const items = [
      {
        label: "Hotel facilities",
        icon: "pi pi-fw pi-building",
        to: "/dictionaries/hotel-facilities",
      },
      {
        label: "Room facilities",
        icon: "pi pi-fw pi-star-fill",
        to: "/dictionaries/room-facilities",
      },
    ];

    const loadDictionaries = async () => {
      isLoading.value = true;
      try {
        await dictionariesStore.fetchDictionaries();
      } catch (error) {
        errorMsg.value =
          error instanceof Error ? error.message : "Something went wrong";
      }
      isLoading.value = false;
    };

    onMounted(() => {
      loadDictionaries();
    });

    return {
      items,
      errorMsg,
      isLoading,
      loadDictionaries,
    };
  },
};
</script>
