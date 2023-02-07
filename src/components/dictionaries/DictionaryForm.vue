<template>
  <form @submit.prevent="updateDictionary" v-if="dictionary" class="pt-3">
    <div class="d-flex gap-3">
      <div class="fields-wrapper">
        <FormFieldWrapper v-for="item in form" :key="item.id">
          <InputText id="name" type="text" v-model="item.value" />
          <label for="name">Dictionary value</label>
        </FormFieldWrapper>
      </div>
      <PButton
        icon="pi pi-plus"
        label="Add value"
        @click="addNewField"
        class="button button--action p-button-rounded p-button-help"
      />
    </div>
    <PButton label="Save changes" type="submit" class="mt-3" />
  </form>
</template>

<script lang="ts">
import { useDictionariesStore } from "@/stores/dictionaries";
import FormFieldWrapper from "@/components/layout/FormFieldWrapper.vue";
import { computed, defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DictionaryForm",
  components: { FormFieldWrapper },
  setup(props: any, { emit }) {
    const dictionariesStore = useDictionariesStore();
    const route = useRoute();
    const routeName = computed(() => route.name);
    const dictionary = ref(routeName.value);
    const form = reactive([{ value: "", id: "", key: "" }]);
    const updateDictionary = async () => {
      await dictionariesStore.addDictionaryItems(
        form.map((field) => ({
          key: field.value.replace(" ", "-").toLowerCase(),
          value: field.value,
        })),
        String(routeName.value)
      );
      emit("valuesChanged");
    };

    const addNewField = () => {
      form.push({ value: "", id: "", key: "" });
    };

    return {
      dictionary,
      form,
      updateDictionary,
      addNewField,
    };
  },
});
</script>
