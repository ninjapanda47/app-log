<template>
<div>
  <EasyDataTable
      :headers="headers"
      :items="applications"
  />
</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import type { Header, Item } from "vue3-easy-data-table";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      headers: [
        {text: "Company Name", value: "companyName"},
        {text: "Job Title", value: "jobTitle"},
        {text: "Job Url", value: "jobUrl"},
        {text: "Date Applied", value: "dateApplied", sortable: true},
        {text: "Status", value: "status", sortable: true},
        {text: "Notes", value: "notes"},
      ],
      applications: [],
    };
  },
  methods: {},
});
</script>
