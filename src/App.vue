<template>
  <v-app theme="dark">
    <v-app-bar title="Application Tracker"
      ><template v-slot:prepend v-if="userStore.isAuthenticated">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon> </template
    ></v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary v-if="userStore.isAuthenticated">
      <v-list density="compact" nav>
        <v-list-item v-for="item in items"
          :prepend-icon="item.icon"
          :title="item.title"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="main-wrapper">
    <router-view></router-view>
    </v-main>
    <v-footer>
      <v-row class="justify-center">
        <v-col class="text-center">
          {{ new Date().getFullYear() }} — <strong>Made with <v-icon icon="mdi-heart-outline" color="pink"></v-icon> by NinjaPanda</strong>

        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import {useVuelidate} from "@vuelidate/core";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  components: {},
  data() {
    return {
      drawer: true,
      username: "Sandi",
      items: [
        { title: "Tracker", icon: "mdi-folder-table", link: "application-log" },
        { title: "Log Out", icon: "mdi-logout", link: "/" },
      ],
    };
  },
});
</script>
<style>
.main-wrapper {
  min-height: 600px;
}
</style>
