<template>
<div>
  <v-row>
    <v-col>  <ApplicationTable class="mx-10"></ApplicationTable></v-col>
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
    return {
    }
  },
  methods: {},
});
</script>
