import { createApp } from "vue";
import { createPinia } from "pinia";
import { useUserStore } from "@/stores/user";
import dayjs from "dayjs";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";

import { createVuetify } from "vuetify";
import type { ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

const myCustomTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#7242c1',
    secondary: '#e63eb6',
    error: '#DC143C',
    info: '#2296f3',
    success: "#00bc8c",
    warning: '#FF8C00',
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "myCustomTheme",
    themes: {
      myCustomTheme,
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component("EasyDataTable", Vue3EasyDataTable);
app.config.globalProperties.$dayjs = dayjs;

const userStore = useUserStore();

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    !userStore.isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== "Login" &&
    to.name !== "Sign-In"
  ) {
    // redirect the user to the login page
    return { name: "Login" };
  }
});

app.mount("#app");
