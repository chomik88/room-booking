<template>
  <DataTable :value="dictionaryValues">
    <Column field="id" header="ID"></Column>
    <Column field="value" header="value"></Column>
    <Column field="actions" header="Actions">
      <template #body="slotProps">
        <div class="d-flex gap-2">
          <PButton
            label="Remove"
            class="p-button-danger"
            @click="removeValue(slotProps.data.id)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { useDictionariesStore } from "@/stores/dictionaries";
import { useRoute } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: "DictionaryValues",
  components: { DataTable, Column },
  setup() {
    const dictionariesStore = useDictionariesStore();
    const route = useRoute();
    const routeName = computed(() => route.name);
    const getDictionaryValues = (dictionary: string) => {
      return dictionariesStore.getDictionaryByName(String(dictionary))
        ?.dictionaryItems;
    };
    const dictionaryValues = ref(getDictionaryValues(String(routeName.value)));

    const removeValue = async (id: string) => {
      await dictionariesStore
        .removeDictionaryItem(id, String(routeName.value))
        .then(() => {
          dictionaryValues.value = getDictionaryValues(String(routeName.value));
        });
    };

    watch(route, (newVal) => {
      dictionaryValues.value = getDictionaryValues(String(newVal.name));
    });
    return {
      dictionaryValues,
      removeValue,
    };
  },
};
</script>
