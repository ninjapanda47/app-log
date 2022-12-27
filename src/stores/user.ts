import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  // ref is basically state in vuex
  const user = ref({});
  const isAuthenticated = ref(false)

  // computed is getters

  // action

  function setUser(authenticatedUser: object) {
    isAuthenticated.value = true
    user.value = authenticatedUser;
  }

  return { user, isAuthenticated, setUser };
});
