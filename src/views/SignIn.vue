<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <v-card width="400" class="mx-auto mt-10">
          <v-card-title class="text-center my-4 text-lg-h4"
            >Create A Login</v-card-title
          >
          <v-form class="mx-5 text-center">
            <v-text-field
              v-model="username"
              label="Username"
              required
            ></v-text-field>
            <v-text-field v-model="email" label="Email" required></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-alert
              v-if="errorMessage"
              class="mb-5"
              type="error"
              density="compact"
              >{{ errorMessage }}</v-alert
            >
            <v-btn color="success" class="mx-auto mb-5" @click="validate">
              Submit
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import * as userService from "@/services/userService";
import { setToken } from "@/utils/fetchUtils";
export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return { v$: useVuelidate(), userStore };
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  validations() {
    return {
      username: { required },
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    async validate() {
      const valid = await this.v$.$validate();
      this.errorMessage = "";
      if (valid) {
        const response = await userService.createNewUserLogin(
          this.username,
          this.email,
          this.password
        );
        if (!response.error) {
          setToken(response.id_token);
          this.userStore.setUser(response.user);
          this.$router.push("application-log");
        } else {
          this.errorMessage = response.message;
        }
      } else {
        this.errorMessage = "Missing required field(s)";
      }
    },
  },
});
</script>
