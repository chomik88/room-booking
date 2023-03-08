<template>
  <div>
    <form class="auth-form border" @submit.prevent="loginUser">
      <FormFieldWrapper>
        <InputText id="email" type="text" v-model="form.email" />
        <label for="email">Email</label>
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Password v-model="form.password" id="password" />
        <label for="password">Password</label>
      </FormFieldWrapper>
      <div class="d-flex justify-content-between">
        <PButton label="Login" type="submit" class="mt-3" />
        <PButton
          label="Register"
          class="mt-3 p-button-secondary"
          @click="goToRegister"
        />
      </div>
    </form>
    <PToast></PToast>
  </div>
</template>

<script lang="ts">
import Password from "primevue/password";
import FormFieldWrapper from "@/components/layout/FormFieldWrapper.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "@/stores/user";

export default {
  name: "AuthLogin",
  components: { FormFieldWrapper, Password },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const toast = useToast();
    const form = reactive({
      email: "",
      password: "",
    });

    const goToRegister = () => {
      router.push({ name: "auth-register" });
    };

    const showError = (message: string) => {
      toast.add({
        severity: "error",
        summary: "Ops!",
        detail: message,
        life: 5000,
      });
    };

    const loginUser = async () => {
      try {
        await userStore.signInUser({
          email: form.email,
          password: form.password,
        });
      } catch (error) {
        showError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    };

    return {
      form,
      goToRegister,
      loginUser,
    };
  },
};
</script>

<style scoped></style>
