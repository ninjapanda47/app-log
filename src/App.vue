<template>
  <v-app>
    <v-app-bar title="Application Tracker"
      ><template v-slot:prepend v-if="userStore.isAuthenticated">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <span class="mr-5 text-h6">{{ personalizedMessage }}</span></v-app-bar
    >
    <v-navigation-drawer
      v-model="drawer"
      temporary
      v-if="userStore.isAuthenticated"
    >
      <v-list density="compact" nav>
        <v-list-item
            prepend-icon="mdi-chart-box-outline"
            title="Reports"
            to="reports"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-folder-table"
          title="Tracker"
          to="application-log"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Log Out"
          @click="logOut"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main >
      <error-dialog></error-dialog>
      <router-view></router-view>
    </v-main>
    <v-footer class="footer-height">
      <v-row class="justify-center">
        <v-col class="text-center">
          {{ new Date().getFullYear() }} —
          <strong
            >Made with
            <v-icon icon="mdi-heart" color="secondary"></v-icon> by
            NinjaPanda</strong
          >
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import ErrorDialog from "@/components/ErrorDialog.vue";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  components: {
    RouterView,
    RouterLink,
    ErrorDialog
  },
  computed: {
    personalizedMessage() {
      if (this.userStore.isAuthenticated && this.userStore.user) {
        return this.userStore.user.username;
      } else {
        return '';
      }
    },
  },
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    logOut() {
      this.userStore.unsetUser();
      this.$router.push("login");
    },
  },
});
</script>
<style>
.footer-height {
  max-height: 50px;
}
</style>
