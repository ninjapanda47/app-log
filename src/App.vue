<template>
  <v-app theme="dark">
    <v-app-bar title="Sandi's Job Tracker"
      ><template v-slot:prepend>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon> </template
    ></v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
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
          {{ new Date().getFullYear() }} — <strong>Made with <v-icon icon="mdi-heart-outline" color="pink"></v-icon> by Sandi</strong>

        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

export default defineComponent({
  components: {},
  data() {
    return {
      drawer: true,
      username: "Sandi",
      items: [
        { title: "Tracker", icon: "mdi-folder-table" },
        { title: "Log Out", icon: "mdi-logout" },
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
