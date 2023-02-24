<template>
  <div>
    <v-row class="mt-5">
      <v-col cols="8" class="pb-0">
        <v-tooltip text="Select applications to delete">
          <template v-slot:activator="{ props }">
            <v-btn
              prepend-icon="mdi-minus"
              color="error"
              v-bind="props"
              @click="deleteApps"
              >Delete</v-btn
            >
          </template>
        </v-tooltip>
      </v-col>
      <v-col cols="4" class="text-right pb-0">
        <div class="d-flex">
            <v-text-field
              label="Company Name"
              v-model="searchValue"
              density="compact"
              single-line
              class="mr-5"
            ></v-text-field><v-btn
            prepend-icon="mdi-plus"
            color="success"
            class="mt-1"
            @click="createDialog = true"
            >Add</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row class="mb-5">
      <v-col cols="12">
        <EasyDataTable
          table-class-name="customize-table"
          :headers="headers"
          :items="applicationStore.applications"
          :sort-by="sortBy"
          :sort-type="sortType"
          v-model:items-selected="itemsSelected"
          :search-field="searchField"
          :search-value="searchValue"
        >
          <template #item-dateApplied="{ dateApplied }">
            {{ formatDate(dateApplied) }}
          </template>
          <template #item-status="item">
            <status-chip :app="item"></status-chip
          ></template>
          <template #item-jobUrl="item"
            ><custom-link :app="item"></custom-link
          ></template>
          <template #item-action="item">
            <v-btn
              size="x-small"
              icon="mdi-pencil"
              color="success"
              class="mr-2"
              @click="setAppToUpdate(item)"
            ></v-btn>
            <v-icon color="secondary" v-if="item.flag" icon="mdi-star"></v-icon>
          </template> </EasyDataTable
      ></v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="updateDialog">
        <ApplicationUpdateView class="updateForm" @close="updateDialog = false"
      /></v-dialog>
    </v-row>
    <v-row justify="center"
      ><v-dialog scrollable v-model="createDialog"
        ><ApplicationForm @close="createDialog = false" /></v-dialog
    ></v-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useApplicationStore } from "@/stores/application";
import type { AppInfo } from "@/stores/application";
import dayjs from "dayjs";
import ApplicationUpdateView from "@/components/ApplicationUpdateView.vue";
import StatusChip from "@/components/StatusChip.vue";
import CustomLink from "@/components/CustomLink.vue";
import ApplicationForm from "@/components/ApplicationForm.vue";

export default defineComponent({
  setup() {
    const applicationStore = useApplicationStore();
    return { applicationStore };
  },
  components: {
    ApplicationUpdateView,
    StatusChip,
    CustomLink,
    ApplicationForm,
  },
  async mounted() {
    await this.applicationStore.fetchAndSetApplications();
  },
  data() {
    return {
      createDialog: false,
      updateDialog: false,
      sortBy: "dateApplied",
      sortType: "desc",
      searchField: "companyName",
      searchValue: "",
      itemsSelected: [] as AppInfo[],
      headers: [
        { text: "Company Name", value: "companyName", width: 150 },
        { text: "Job Title", value: "jobTitle", width: 200 },
        { text: "Job Url", value: "jobUrl", width: 400 },
        { text: "Date Applied", value: "dateApplied", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "Action", value: "action" },
      ],
    };
  },
  methods: {
    setAppToUpdate(item: AppInfo) {
      this.applicationStore.setApplicationToUpdate(item);
      this.updateDialog = true;
    },
    async deleteApps() {
      let idsToRemove = [] as string[];
      this.itemsSelected.forEach((item) => {
        idsToRemove.push(item._id);
      });
      await this.applicationStore.removeApplications(idsToRemove);
    },
    formatDate(dateString: string) {
      if (dateString) {
        const date = dayjs(dateString);
        return date.format("MM/DD/YYYY");
      } else {
        return "";
      }
    },
  },
});
</script>
<style>
.customize-table {
  --easy-table-border: 1px solid #bbbbbb;
  --easy-table-row-border: 1px solid #bbbbbb;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #a2a2a2;
  --easy-table-header-background-color: #212121;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-row-font-color: #a2a2a2;
  --easy-table-body-row-background-color: #212121;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-item-padding: 10px 15px;
  --easy-table-body-row-hover-font-color: #a2a2a2;
  --easy-table-body-row-hover-background-color: #212121;

  --easy-table-footer-background-color: #212121;
  --easy-table-footer-font-color: #a2a2a2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
}
</style>
