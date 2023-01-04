<template>
  <div class="truncate-ellipsis">
    <a
       :href="app.jobUrl" target="_blank">
      {{ app.jobUrl}}
    </a>
  </div>
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
  },
  methods: {

  },
});
</script>
<style>
.truncate-ellipsis {
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

</style>
