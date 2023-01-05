<template>
<div>
  <v-row>
    <v-col class="text-right mr-10 mt-5">    <v-btn
        prepend-icon="mdi-plus"
        color="success"
@click="updateDialog = true"    >Add</v-btn> </v-col>
  </v-row>
  <v-row>
    <v-col>  <ApplicationTable class="mx-10" @close="dialog = false"></ApplicationTable></v-col>
  </v-row>
  <v-row justify="center"><v-dialog
      scrollable
      v-model="updateDialog"
  ><ApplicationForm @close="updateDialog = false"/></v-dialog></v-row>
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
    ApplicationForm,
  },
  data() {
    return {
      dialog: false,
      updateDialog: false
    }
  },
  methods: {},
});
</script>
