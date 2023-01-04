<template>
  <div class="text-center">
    <v-dialog v-model="applicationStore.hasError">
      <v-card class="text-center">
        <v-card-title class="text-h5 font-weight-bold">{{
          applicationStore.apiError.error
        }}</v-card-title>
        <v-card-text class="font-weight-bold">
          The API call returned a status code of
          {{ applicationStore.apiError.statusCode }}.
          <br />
          {{ applicationStore.apiError.message }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="applicationStore.clearApiError"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { useApplicationStore } from "@/stores/application";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const applicationStore = useApplicationStore();
    return { applicationStore };
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    resetError() {
      this.applicationStore.clearApiError();
      this.$router.push("login");
    },
  },
});
</script>
