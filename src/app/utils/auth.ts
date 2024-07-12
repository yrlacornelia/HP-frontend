export const checkUserLoggedIn = async () => {
    const response = await fetch('http://localhost:8080/userLoggedIn', {
        credentials: 'include',
       
    });
    const data = await response.json();
    console.log(data)
    return data;
};


export const fetchCsrfToken = async () => {
    const response = await fetch('http://localhost:8080/csrf-token', {
        credentials: 'include'
    });
    const data = await response.json();
    return data.token;
};