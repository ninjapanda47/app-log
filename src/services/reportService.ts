import type {DateInfo} from "@/stores/application";

const api = "http://localhost:3000/report";

let token = localStorage.getItem("user-token");

const headers = new Headers();

headers.append("Authorization", `Bearer ${token}`);
headers.append("Content-Type", "application/json");


export const getJobReport = async (dateFilter: DateInfo ) => {
    let response = await fetch(`${api}/${dateFilter.startDate}/${dateFilter.endDate}`, {
        method: "GET",
        headers,
    });
    return await response.json();
};

