<template>
  <div class="pt-4">
    <h2>{{ dictionaryName }}</h2>
    <div class="row">
      <div class="col-12">
        <DictionaryValues />
      </div>
      <div class="col-12">
        <DictionaryForm @valuesChanged="$emit('valuesChanged')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DictionaryForm from "@/components/dictionaries/DictionaryForm.vue";
import DictionaryValues from "@/components/dictionaries/DictionaryValues.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "DictionaryWrapper",
  components: { DictionaryValues, DictionaryForm },
  setup() {
    const route = useRoute();
    const routeName = computed(() => route.name);
    const dictionaryName = computed(() => {
      const nameWords = String(routeName.value).split("-");
      let words = [] as string[];
      nameWords.map((word) =>
        words.push(word[0].toUpperCase() + word.substring(1))
      );
      return words.join(" ");
    });

    return {
      dictionaryName,
      routeName,
    };
  },
};
</script>
