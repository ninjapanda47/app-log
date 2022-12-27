import { Headers } from "node-fetch";
const api = "http://localhost:3000/application";

let token = localStorage.getItem("user-token");

const headers = new Headers();

headers.set("Authorization", `Bearer ${token}`);
headers.set("Content-Type", "application/json");

// create new application
export const addNewApplication = async (application: object) => {
  let response = await fetch(`${api}/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(application),
  });
  let data = await response.json();
  console.log(data);
  return data;
};

export const updateApplication = async (id: string, update: object) => {
  let response = await fetch(`${api}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({update}),
  });
  let data = await response.json();
  console.log(data);
  return data;
};
