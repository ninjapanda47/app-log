const api = "http://localhost:3000/application";

let token = localStorage.getItem("user-token");

const headers = new Headers();

headers.append("Authorization", `Bearer ${token}`);
headers.append("Content-Type", "application/json");

export const getApplications = async () => {
  let response = await fetch(`${api}`, {
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
  const data = await response.json()
  console.log('in service', data)
  return data
};

export const updateApplication = async (id: string, update: object) => {
  let response = await fetch(`${api}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ update }),
  });
  return await response.json();
};
