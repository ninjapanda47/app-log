<template>
  <div>
    <v-row>
      <v-card width="800px">
        <v-card-text>
          <div>
            <v-row
              ><v-col col="4"></v-col>
              <v-col col="4"></v-col>
              <v-col col="4" class="d-flex justify-end"
                ><v-select
                  class="select"
                  v-model="status"
                  label="Status"
                  :items="[
                    'Applied',
                    'In Process',
                    'Rejected',
                    'Received Offer',
                  ]"
                ></v-select></v-col
            ></v-row>
            <v-row
              ><v-col>
                <v-textarea
                  v-model="notes"
                  label="Notes"
                  variant="outlined"
                ></v-textarea> </v-col
            ></v-row>
          </div>
        </v-card-text>
        <div>
          <v-row class="mx-2 mb-2">
            <v-col col="6">
              <v-btn color="#2296f3" @click="updateApplication"
                >Update</v-btn
              ></v-col
            >
            <v-col col="6" class="d-flex justify-end">
              <v-btn color="#2296f3" variant="outlined" @click="closeDialog"
                >Close Dialog</v-btn
              ></v-col
            >
          </v-row>
        </div>
      </v-card>
    </v-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useApplicationStore } from "@/stores/application";

export default defineComponent({
  setup() {
    const applicationStore = useApplicationStore();
    return { applicationStore };
  },
  async mounted() {
    this.id = this.applicationStore.application?._id;
    this.status = this.applicationStore.application?.status;
    this.notes = this.applicationStore.application?.notes || "";
  },
  data() {
    return {
      id: "",
      status: "",
      notes: "",
    };
  },
  methods: {
    closeDialog() {
      this.applicationStore.clearApplicationToUpdate();
      this.$emit("close");
    },
    async updateApplication() {
      const update = {
        status: this.status,
        notes: this.notes,
      };
      await this.applicationStore.updateApplication(this.id, update);
      this.closeDialog()
    },
  },
});
</script>
<style>
.select {
  width: 200px;
}
</style>
