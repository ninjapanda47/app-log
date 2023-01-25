const api = 'http://localhost:3000/user';

// Login
export const userLogin = async (username: string, password: string) => {
    let response = await fetch(`${api}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    let data = await response.json();
    return data;
};

// create login
export const createNewUserLogin = async (username: string, email: string, password: string) => {
    let response = await fetch(`${api}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
    });
    let data = await response.json();
    return data;
};