'use client';

import { time } from "console";


export const fetchCsrfToken = async () => {
    const response = await fetch('http://localhost:8080/csrf-token', {
        credentials: 'include'
    });
    const data = await response.json();
    return data.token;
};


// profile 
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

export const uploadImage = async (imageData: any, csrfToken: any) => {
    console.log(imageData)
    try {

        const formData = new FormData();
        formData.append('image', imageData);
console.log(imageData)
        const response = await fetch('http://localhost:8080/users/uploadProfileImage', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            body: formData,
            credentials: 'include',
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



// Admin

export const fetchAllusers = async () => {
    const response = await fetch('http://localhost:8080/admin/allusers', {
        credentials: 'include'
    });
    const data = await response.json();
    return data;
};

export const deleteUser = async (csrfToken:any, userId:number) => {
    console.log(userId)
    const response = await fetch(`http://localhost:8080/admin/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': csrfToken
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    
    const data = await response.json();
    return data;
};



export const createEvent = async (csrfToken: any, title:string, content:string, time:any) => {
    console.log(time)
    const eventData = {
        title: title,
        content: content,
        startTime:time
        
    };

    const response = await fetch('http://localhost:8080/admin/createEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(eventData),
        credentials: 'include'
    });

if (response.ok) {
    console.log('User created successfully');
} else {
    console.error('Error creating user:', response.statusText);
}
}
export const createPerson = async (csrfToken: any) => {
    const userData = {
        username: "TEST",
        password: "testagain"
    };

    const response = await fetch('http://localhost:8080/users/createNewPerson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(userData),
        credentials: 'include'
    })};
    export const createUser = async (csrfToken: any, username:string, password:string) => {
        const userData = {
            username: username,
            password: password
        };
    
        const response = await fetch('http://localhost:8080/users/createNewPerson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

    if (response.ok) {
        console.log('User created successfully');
    } else {
        console.error('Error creating user:', response.statusText);
    }
}


/// chat

export const fetchAllEvents = async () => {
    const response = await fetch('http://localhost:8080/users/allEvents', {
        credentials: 'include'
    });
    const data = await response.json();
    return data;
};

export const fetchCurrentEvents = async () => {
    try {
        const response = await fetch('http://localhost:8080/users/getevents', {
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