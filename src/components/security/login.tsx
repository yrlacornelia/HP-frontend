'use client'
import { fetchCsrfToken } from '@/app/utils/api';
import { cookies } from 'next/dist/client/components/headers';
import { useRouter } from 'next/navigation'
import type { NextRequest } from 'next/server'
import React, { useState, useEffect } from 'react';

const LoginForm = () => {

const router = useRouter()
    const [csrfToken, setCsrfToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const getCsrfToken = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        };
        getCsrfToken();
    }, []);

    const handleSubmit = async (e:any) => {

    e.preventDefault()
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
});

const data = await response.json();
console.log(data);

        if (response.ok) {
            localStorage.setItem("user", "true");
            console.log("HELLO ")
        } else {
            
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type="hidden" name="_csrf" value={csrfToken} />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
