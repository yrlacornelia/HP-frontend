'use client';


export const fetchCsrfToken = async () => {
    const response = await fetch('http://localhost:8080/csrf-token', {
        credentials: 'include'
    });
    const data = await response.json();
    return data.token;
};

export const fetchCurrentUser = async () => {
    try {
        const response = await fetch('http://localhost:8080/users/currentuser', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        throw error;
    }
};

export const changeProfile = async (csrfToken:any, username:string) => {
    try {
        const response = await fetch('http://localhost:8080/users/userSettings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ username }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Profile update failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Profile update failed:', error);
        throw error;
    }
};


export const uploadImage = async (imageData:any) => {
    try {
        const formData = new FormData();
        formData.append('image', imageData);

        const response = await fetch('http://localhost:8080/users/uploadProfileImage', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
};

export const handleSubmit = async (username: string, password: string, csrfToken:any) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    
    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': csrfToken
        },
        body: formData,
        credentials: 'include'
    })
}
