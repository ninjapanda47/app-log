<template>
  <div>
    <EasyDataTable  table-class-name="customize-table" :headers="headers" :items="applicationStore.applications" :sort-by="sortBy"
                    :sort-type="sortType">
      <template #item-dateApplied="{ dateApplied }">
        {{ formatDate(dateApplied) }}
      </template>
      <template #item-status="item"> <status-chip :app="item"></status-chip></template>
      <template #item-jobUrl="item"><custom-link :app="item"></custom-link></template>
      <template #item-action="item">
        <v-btn
            size="x-small"
              icon="mdi-pencil"
              color="success"
            class="mr-2"
            @click="setAppToUpdate(item)"
        ></v-btn> <v-icon color="pink" v-if="item.flag" icon="mdi-star"></v-icon>
      </template>
    </EasyDataTable>
    <div>
      <v-dialog
          v-model="dialog"
      >
      <ApplicationUpdateView class="updateForm" @close="dialog = false"/></v-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useApplicationStore} from "@/stores/application";
import type { AppInfo } from "@/stores/application"
import dayjs from "dayjs";
import ApplicationUpdateView from "@/views/ApplicationUpdateView.vue";
import StatusChip from "@/views/StatusChip.vue";
import CustomLink from "@/views/CustomLink.vue";

export default defineComponent({
  setup() {
    const applicationStore = useApplicationStore();
    return { applicationStore };
  },
  components: {
    ApplicationUpdateView, StatusChip, CustomLink
  },
  async mounted() {
    await this.applicationStore.fetchAndSetApplications();
  },
  data() {
    return {
      dialog: false,
      sortBy: "dateApplied",
      sortType: "desc",
      headers: [
        { text: "Company Name", value: "companyName", width: 150 },
        { text: "Job Title", value: "jobTitle", width: 200 },
        { text: "Job Url", value: "jobUrl", width: 400 },
        { text: "Date Applied", value: "dateApplied", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "Action", value: 'action'}
      ],
    };
  },
  methods: {
    setAppToUpdate(item: AppInfo) {
      this.applicationStore.setApplicationToUpdate(item)
      this.dialog = true
    },
    formatDate(dateString: string) {
      if (dateString) {
        const date = dayjs(dateString);
        return date.format("MM/DD/YYYY");
      }
      else {
        return ''
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
