<template>
    <v-responsive >
      <v-container>
        <v-row align="center">
          <v-col>
            <v-card width="400"
                     class="mx-auto mt-10 ">
              <v-card-title class="text-center my-4 text-lg-h4">Login</v-card-title>
              <v-form class="mx-5 text-center">
                <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>
                <v-btn
                    color="success"
                    class="mx-auto mb-5"
                    @click="validate"
                >
                  Submit
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
</template>
<script lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    async validate() {
      const valid = await this.v$.$validate();
      if (valid) {
        // login via auth0
      } else {

      }
    },
  },
});
</script>
