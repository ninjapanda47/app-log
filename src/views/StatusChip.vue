<template>
  <div :class="color">{{ app.status }}</div>
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
    app: Object,
  },
  data() {
    return {};
  },
  computed: {
    color() {
      if (this.app?.status === "Applied") {
        return "chip gray";
      } else if (this.app?.status === "In Process") {
        return "chip blue";
      } else if (this.app?.status === "Received Offer") {
        return "chip green";
      } else {
        return "chip red";
      }
    },
  },
  methods: {},
});
</script>
<style>
.chip {
  display: inline-block;
  padding: 0 12px;
  height: 32px;
  font-size: 0.875rem;
  line-height: 30px;
  border-radius: 20px;
  color: white;
}

.gray {
  background-color: gray;
}

.green {
  background-color: #00bc8c;
}

.red {
  background-color: #dc143c;
}

.blue {
  background-color: #2296f3;
}
</style>
