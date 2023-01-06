import type {DateInfo} from "@/stores/application";

const api = "http://localhost:3000/application";

let token = localStorage.getItem("user-token");

const headers = new Headers();

headers.append("Authorization", `Bearer ${token}`);
headers.append("Content-Type", "application/json");


export const getApplications = async (userid: string) => {
  let response = await fetch(`${api}/${userid}`, {
    method: "GET",
    headers,
  });
  return await response.json();
};

// create new application
export const addNewApplication = async (application: object) => {
  let response = await fetch(`${api}/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(application),
  });
  return await response.json()
};

export const updateApplication = async (id: string, update: object) => {
  let response = await fetch(`${api}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ update }),
  });
  return await response.json();
};

export const removeApplications = async (idsToRemove: Array<string>) => {
  let response = await fetch(`${api}`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ idsToRemove }),
  });
  return await response.json();
};
