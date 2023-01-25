import type { DateInfo } from "@/stores/application";
import { createHeader } from "@/utils/fetchUtils";

const api = "http://localhost:3000/report";

export const getJobReport = async (dateFilter: DateInfo) => {
    const headers = createHeader()
  let response = await fetch(
    `${api}/${dateFilter.startDate}/${dateFilter.endDate}`,
    {
      method: "GET",
      headers,
      credentials: "include",
    }
  );
  return await response.json();
};
