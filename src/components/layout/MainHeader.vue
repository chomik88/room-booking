<template>
  <header class="mb-5">
    <Menubar :model="menuItems" />
  </header>
</template>

<script lang="ts">
import Menubar from "primevue/menubar";
import type MenuItem from "../../../types/MenuItem";
import { type Ref, ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

export default {
  name: "MainHeader",
  components: { Menubar },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const isLoggedIn = computed(() => userStore.isLoggedIn);
    const menuItems: Ref<MenuItem[]> = computed(() => [
      {
        label: "Home",
        to: "/",
        key: "home",
      },
      {
        label: "Dictionary",
        to: "/dictionaries",
        key: "dictionary",
        visible: isLoggedIn.value,
      },
      {
        label: "Login",
        to: "/auth",
        key: "login",
        visible: !isLoggedIn.value,
      },
      {
        label: "Logout",
        key: "logout",
        visible: isLoggedIn.value,
        command: () => {
          userStore.logOutUser();
          router.push({ name: "home" });
        },
      },
    ]);

    return {
      menuItems,
    };
  },
};
</script>
