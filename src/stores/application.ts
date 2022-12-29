import { ref, computed } from "vue";
import { defineStore } from "pinia";
import * as applicationService from "@/services/applicationService";
export interface AppInfo {
    _id: string
    userId: string
    companyName: string
    jobTitle: string
    jobUrl: string
    dateApplied: string
    status: string
    notes?: string
}
export const useApplicationStore = defineStore("application", () => {

  // ref is basically state in vuex
  const applications = ref([] as AppInfo[]);
  const application = ref( {} as AppInfo)

  // computed is getters

  // action

  const fetchAndSetApplications = async () => {
    try {
      const data = await applicationService.getApplications();
      applications.value = data.applications;
    } catch (error) {
      return error;
    }
  };

  const setApplicationToUpdate = (app: AppInfo ) => {
      application.value = app
  }

  const clearApplicationToUpdate = () => {
      application.value = {} as AppInfo
  }

  const addApplication = async (app: object) => {
    try {
      const { newApplication } = await applicationService.addNewApplication(
        app
      );
      applications.value.push(newApplication);
    } catch (error) {
      return error;
    }
  };

  const updateApplication = async (id: string, update: object) => {
    try {
      await applicationService.updateApplication(id, update);
      await fetchAndSetApplications()
    } catch (error) {
      return error;
    }
  };

  return { applications, application, fetchAndSetApplications, addApplication, updateApplication, setApplicationToUpdate, clearApplicationToUpdate };
});
