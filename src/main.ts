import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import { createApp, watch } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";
import { VueFire } from "vuefire";
import { firebaseApp } from "@/firebaseConfig";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";

const pinia = createPinia();
const app = createApp(App);

if (localStorage.getItem("state")) {
  pinia.state.value = JSON.parse(localStorage.getItem("state") || "");
}

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("state", JSON.stringify(state));
  },
  { deep: true }
);

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(VueFire, {
  firebaseApp,
});
app.use(ConfirmationService);

app.component("PCard", Card);
app.component("PButton", Button);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("PTextarea", Textarea);
app.component("PToast", Toast);
app.component("PConfirmDialog", ConfirmDialog);

app.mount("#app");
