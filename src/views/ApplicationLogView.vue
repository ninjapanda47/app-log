<template>
<div>
  <v-row>
    <v-col class="text-right mr-10 mt-5">    <v-dialog
        scrollable
        v-model="dialog"
        width="600"
        contained    > <template v-slot:activator="{ props }"><v-btn
        prepend-icon="mdi-plus"
        color="success"
        v-bind="props"
    >Add</v-btn></template><ApplicationForm @close="dialog = false"/></v-dialog></v-col>
  </v-row>
  <v-row>
    <v-col>  <ApplicationTable class="mx-10 mt-5"></ApplicationTable></v-col>
  </v-row>
</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ApplicationTable from "@/views/ApplicationTable.vue";
import ApplicationForm from "@/views/ApplicationForm.vue";

export default defineComponent({
  setup() {
  },
  components: {
    ApplicationTable,
    ApplicationForm
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {},
});
</script>