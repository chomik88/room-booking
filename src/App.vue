<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import MainHeader from "@/components/layout/MainHeader.vue";
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

userStore.$subscribe((mutation, state) => {
  if (!state.user) {
    router.push({ name: "home" });
  }
});
</script>

<template>
  <MainHeader />
  <LayoutContainer>
    <RouterView />
  </LayoutContainer>
</template>

<style lang="scss">
@import "../src/scss/main";
</style>
