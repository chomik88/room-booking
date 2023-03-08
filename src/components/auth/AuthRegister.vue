<template>
  <div>
    <form class="auth-form border" @submit.prevent="registerUser">
      <FormFieldWrapper>
        <InputText id="email" type="text" v-model="form.email" />
        <label for="email">Email</label>
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Password v-model="form.password" id="password" />
        <label for="password">Password</label>
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Password
          v-model="form.passwordRepeat"
          id="passwordRepeat"
          :feedback="false"
        />
        <label for="passwordRepeat">Password repeat</label>
      </FormFieldWrapper>
      <div class="d-flex justify-content-between">
        <PButton label="Register" type="submit" class="mt-3" />
        <PButton
          label="Login"
          class="mt-3 p-button-secondary"
          @click="goToLogin"
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
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";

export default {
  name: "AuthRegister",
  components: { Password, FormFieldWrapper },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const toast = useToast();

    const form = reactive({
      email: "",
      password: "",
      passwordRepeat: "",
    });

    const showError = (message: string) => {
      toast.add({
        severity: "error",
        summary: "Ops!",
        detail: message,
        life: 5000,
      });
    };

    const goToLogin = () => {
      router.push({ name: "auth-login" });
    };

    const registerUser = async () => {
      const emptyValues = Object.values(form).filter((item) => item === "");
      if (emptyValues.length) {
        return showError("You must fill in all fields");
      }
      if (form.password !== form.passwordRepeat) {
        return showError("Password and Password repeat are not the same");
      }
      try {
        await userStore.createUser({
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
      goToLogin,
      registerUser,
    };
  },
};
</script>

<style scoped></style>
