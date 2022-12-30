import { ref, computed } from "vue";
import { defineStore } from "pinia";
import * as applicationService from "@/services/applicationService";
import { useUserStore } from "@/stores/user";


export interface AppInfo {
  _id: string;
  userId: string;
  companyName: string;
  jobTitle: string;
  jobUrl: string;
  dateApplied: string;
  status: string;
  notes?: string;
}

export interface ErrorInfo {
  statusCode: string;
  error: string;
  message: string;
}
export const useApplicationStore = defineStore("application", () => {
  const userStore = useUserStore();
  // ref is basically state in vuex
  const applications = ref([] as AppInfo[]);
  const application = ref({} as AppInfo);
  const apiError = ref({} as ErrorInfo)
  const hasError = ref(false)

  // computed is getters

  // action

  const fetchAndSetApplications = async () => {
    try {
      const response = await applicationService.getApplications();
      if (response.applications) {
        applications.value = response.applications
      }
      else {
        const { statusCode, error, message} = response
        if (statusCode === 401) {
          userStore.unsetUser();
        }
        hasError.value = true
        apiError.value.statusCode = statusCode
        apiError.value.error = error
        apiError.value.message = message
      }
    } catch (error) {
      return error;
    }
  };

  const setApplicationToUpdate = (app: AppInfo) => {
    application.value = app;
  };

  const clearApplicationToUpdate = () => {
    application.value = {} as AppInfo;
  };

  const clearApiError = () => {
    hasError.value = false
    apiError.value = {} as ErrorInfo
  }

  const addApplication = async (app: object) => {
    try {
        const response = await applicationService.addNewApplication(app);
      if (response.newApplication) {
        applications.value.push(response.newApplication);
      } else {
        const { statusCode, error, message} = response
        if (statusCode === 401) {
          userStore.unsetUser();
        }
        hasError.value = true
        apiError.value.statusCode = statusCode
        apiError.value.error = error
        apiError.value.message = message
      }
    } catch (error) {
      return error;
    }
  };

  const updateApplication = async (id: string, update: object) => {
    try {
      const response = await applicationService.updateApplication(
        id,
        update
      );
      if (response.success) {
          await fetchAndSetApplications()
      } else {
        const { statusCode, error, message} = response
        if (statusCode === 401) {
          userStore.unsetUser();
        }
        hasError.value = true
        apiError.value.statusCode = statusCode
        apiError.value.error = error
        apiError.value.message = message
      }
    } catch (error) {
      return error;
    }
  };

  // add a bulk delete handler later

  return {
    applications,
    application,
    apiError,
    hasError,
    fetchAndSetApplications,
    addApplication,
    updateApplication,
    setApplicationToUpdate,
    clearApplicationToUpdate,
    clearApiError,
  };
});
