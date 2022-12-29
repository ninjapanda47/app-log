import { ref, computed } from "vue";
import { defineStore } from "pinia";
export interface UserInfo {
  _id: string
  username: string
  email: string
}
export const useUserStore = defineStore("user", () => {
  // ref is basically state in vuex
  const user = ref({} as UserInfo)
  const isAuthenticated = ref(false)

  // computed is getters

  // action

  const setUser = (authenticatedUser: UserInfo) => {
    isAuthenticated.value = true
    user.value = authenticatedUser;
  }

  const unsetUser = () => {
    isAuthenticated.value = false
    user.value = {} as UserInfo
  }

  return { user, isAuthenticated, setUser, unsetUser };
});
