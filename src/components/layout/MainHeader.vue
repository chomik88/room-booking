<template>
  <header class="mb-5">
    <Menubar :model="menuItems" />
  </header>
</template>

<script lang="ts">
import Menubar from "primevue/menubar";
import type MenuItem from "../../../types/MenuItem";
import { type Ref, ref } from "vue";

export default {
  name: "MainHeader",
  components: { Menubar },
  setup() {
    const menuItems: Ref<MenuItem[]> = ref([
      {
        label: "Home",
        to: "/",
        key: "home",
      },
    ]);

    return {
      menuItems,
    };
  },
};
</script>
