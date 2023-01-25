import { ref, computed } from "vue";
import { defineStore } from "pinia";
import * as applicationService from "@/services/applicationService";
import * as reportService from "@/services/reportService";
import { useUserStore } from "@/stores/user";
import dayjs, { Dayjs } from "dayjs";

export interface AppInfo {
  _id: string;
  userId: string;
  companyName: string;
  jobTitle: string;
  jobUrl: string;
  dateApplied: string;
  status: string;
  notes?: string;
  flag?: boolean;
}

export interface ErrorInfo {
  statusCode: string;
  error: string;
  message: string;
}

export interface DateInfo {
  startDate: string | Date;
  endDate: string | Date;
}

export interface ReportInfo {
  total: number;
  rejectedCount: number;
  inProcessCount: number;
}

export const useApplicationStore = defineStore("application", () => {
  const userStore = useUserStore();
  // ref is basically state in vuex
  const applications = ref([] as AppInfo[]);
  const application = ref({} as AppInfo);
  const apiError = ref({} as ErrorInfo);
  const hasError = ref(false);
  const dateFilter = ref({
    startDate: dayjs().subtract(30, "day").toDate(),
    endDate: dayjs().add(1, "day").toDate(),
  } as DateInfo);
  const report = ref({
    total: 0,
    rejectedCount: 0,
    inProcessCount: 0,
  } as ReportInfo);

  // computed is getters

  // action
  const fetchAndSetReport = async () => {
    const formattedDate = {
      startDate: dayjs(dateFilter.value.startDate).format("MM-DD-YYYY"),
      endDate: dayjs(dateFilter.value.endDate).format("MM-DD-YYYY"),
    };
    try {
      const response = await reportService.getJobReport(formattedDate);
      if (response.total) {
        report.value = response;
      } else {
        const { statusCode, error, message } = response;
        if (statusCode === 401) {
          userStore.unsetUser();
        }
        hasError.value = true;
        apiError.value.statusCode = statusCode;
        apiError.value.error = error;
        apiError.value.message = message;
      }
    } catch (error) {
      return error;
    }
  };

  const fetchAndSetApplications = async () => {
    try {
      const response = await applicationService.getApplications(userStore.user._id);
      if (response.applications) {
        applications.value = response.applications;
      } else {
        const { statusCode, error, message } = response;
        if (statusCode === 401) {
          userStore.unsetUser();
        }
        hasError.value = true;
        apiError.value.statusCode = statusCode;
        apiError.value.error = error;
        apiError.value.message = message;
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
    hasError.value = false;
    apiError.value = {} as ErrorInfo;
  };

  const addApplication = async (app: object) => {
    try {
      const response = await applicationService.addNewApplication(app);
      if (response.newApplication) {
        applications.value.push(response.newApplication);
      } else {
        const { statusCode, error, message } = response;
        if (statusCode === 401) {
          userStore.unsetUser();
        }
        hasError.value = true;
        apiError.value.statusCode = statusCode;
        apiError.value.error = error;
        apiError.value.message = message;
      }
    } catch (error) {
      return error;
    }
  };

  const updateApplication = async (id: string, update: object) => {
    try {
      const response = await applicationService.updateApplication(id, update);
      if (response.success) {
        await fetchAndSetApplications();
      } else {
        const { statusCode, error, message } = response;
        if (statusCode === 401) {
          userStore.unsetUser();
        }
        hasError.value = true;
        apiError.value.statusCode = statusCode;
        apiError.value.error = error;
        apiError.value.message = message;
      }
    } catch (error) {
      return error;
    }
  };

  const removeApplications = async (idsToRemove: Array<string>) => {
    try {
      const response = await applicationService.removeApplications(idsToRemove);
      if (response.success) {
        await fetchAndSetApplications();
      } else {
        const { statusCode, error, message } = response;
        if (statusCode === 401) {
          userStore.unsetUser();
        }
        hasError.value = true;
        apiError.value.statusCode = statusCode;
        apiError.value.error = error;
        apiError.value.message = message;
      }
    } catch (error) {
      return error;
    }
  }

  // add a bulk delete handler later

  return {
    applications,
    application,
    apiError,
    hasError,
    report,
    dateFilter,
    fetchAndSetApplications,
    addApplication,
    updateApplication,
    removeApplications,
    setApplicationToUpdate,
    clearApplicationToUpdate,
    clearApiError,
    fetchAndSetReport,
  };
});
