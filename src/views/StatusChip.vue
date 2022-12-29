<template>
<v-chip :color="color">{{ app.status }}</v-chip>
</template>
<script lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return { v$: useVuelidate(), userStore };
  },
  props: {
    app: Object
  },
  data() {
    return {

    };
  },
  computed: {
    color() {
      if (this.app?.status === ('Applied' || 'In Process')){
        return 'yellow'
      } else if (this.app?.status === 'Received Offer') {
        return 'green'
      }
      else {
        return 'red'
      }
    },
  },
  methods: {

  },
});
</script>
