<template>
  <div>
    <v-card width="800px">
      <v-card-text class="my-4 text-center">
        <v-form class="mx-5 text-left">
          <v-text-field
            v-model="companyName"
            label="Company Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="jobTitle"
            label="Job Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="jobUrl"
            label="Job Link"
            required
          ></v-text-field>
          <datepicker
            v-model="dateApplied"
            typeable
            class="mb-5 left"
          />
          <v-select
            v-model="status"
            label="Status"
            :items="['Applied', 'In Process', 'Rejected', 'Received Offer']"
          ></v-select>
          <v-textarea v-model="notes" label="Notes"></v-textarea>
        </v-form>
        <v-btn color="primary" class="text-center mb-5" @click="add">
          Submit
        </v-btn>
        <v-btn color="primary" variant="outlined" class="mb-5 ml-2" @click="closeDialog"
        >Close</v-btn
        >
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useApplicationStore } from "@/stores/application";
import { useUserStore } from "@/stores/user";
import Datepicker from "vue3-datepicker";

export default defineComponent({
  setup() {
    const applicationStore = useApplicationStore();
    const userStore = useUserStore();
    return { applicationStore, userStore };
  },
  components: {
    Datepicker,
  },
  async mounted() {},
  data() {
    return {
      companyName: "",
      jobTitle: "",
      jobUrl: "",
      dateApplied: new Date(),
      status: "",
      notes: "",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    async add() {
      const app = {
        userId: this.userStore.user._id,
        companyName: this.companyName,
        jobTitle: this.jobTitle,
        jobUrl: this.jobUrl,
        dateApplied: this.dateApplied || new Date(),
        status: this.status,
        notes: this.notes,
      };
      await this.applicationStore.addApplication(app);
      this.$emit("close");
      this.companyName = "";
      this.jobTitle = "";
      this.jobUrl = "";
      this.dateApplied = new Date();
      this.status = "";
      this.notes = "";
    },
  },
});
</script>
<style>
.left {
  text-align: left;
}
</style>
