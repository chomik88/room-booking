<script setup lang="ts">
import { RouterView } from "vue-router";
import MainHeader from "@/components/layout/MainHeader.vue";
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
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
