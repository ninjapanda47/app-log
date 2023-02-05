<template>
  <v-card class="report">
    <v-row class="my-5">
      <v-col col="6"></v-col>
      <v-col col="6" class="d-flex justify-center"
        >From:
        <datepicker
          v-model="applicationStore.dateFilter.startDate"
          typeable
          class="dateFilter"
        />
        To:
        <datepicker
          v-model="applicationStore.dateFilter.endDate"
          typeable
          class="dateFilter"
        /><v-btn
          prepend-icon="mdi-magnify"
          color="info"
          @click="applicationStore.fetchAndSetReport"
          >Filter</v-btn
        ></v-col
      >
    </v-row>
    <v-row class="mx-5">
      <v-col col="4" class="d-flex justify-center"
        ><v-card class="scoreCard" variant="outlined" color="primary"
          ><h2>
            Total Application: {{ applicationStore.report.total }}
          </h2></v-card
        ></v-col
      >
      <v-col col="4" class="d-flex justify-center">
        <v-card class="scoreCard" color="primary"
          ><h2 class="my-auto">
            Application In Process: {{ applicationStore.report.inProcessCount }}
          </h2></v-card
        ></v-col
      >
      <v-col col="4" class="d-flex justify-center"
        ><v-card class="scoreCard" color="warning" theme="dark"
          ><h2>
            Rejection: {{ applicationStore.report.rejectedCount }}
          </h2></v-card
        ></v-col
      >
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useApplicationStore } from "@/stores/application";
import type { AppInfo } from "@/stores/application";
import dayjs from "dayjs";
import Datepicker from "vue3-datepicker";

export default defineComponent({
  setup() {
    const applicationStore = useApplicationStore();
    return { applicationStore };
  },
  components: {
    Datepicker,
  },
  async mounted() {
    await this.applicationStore.fetchAndSetReport();
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
<style>
.report {
  min-height: 800px;
}
.dateFilter {
  color: white;
  font-weight: bold;
  margin-left: 5px;
  margin-right: 5px;
}
.scoreCard {
  width: 100%;
  text-align: center;
  margin: auto;
  padding: 10px;
}
</style>
