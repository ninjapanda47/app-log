<template>
<div>
  <v-row>
    <v-col class="text-right mr-10 mt-5"><v-btn
        icon="mdi-plus"
        color="success"
    ></v-btn></v-col>
  </v-row>
  <v-row>
    <v-col>  <ApplicationTable class="mx-10 mt-5"></ApplicationTable></v-col>
  </v-row>
</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ApplicationTable from "@/views/ApplicationTable.vue";

export default defineComponent({
  setup() {
  },
  components: {
    ApplicationTable
  },
  data() {

  },
  methods: {},
});
</script>