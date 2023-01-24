<script setup lang="ts">
import { RouterView } from "vue-router";
import MainHeader from "@/components/layout/MainHeader.vue";
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import firebaseConfig from "@/firebaseConfig";
import { initializeApp, getApps } from "firebase/app";

if (getApps().length == 0) {
  initializeApp(firebaseConfig);
}
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
