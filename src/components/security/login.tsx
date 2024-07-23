'use client'
import styles from './security.module.css'
import { fetchCsrfToken } from '@/app/utils/api';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const LoginForm = () => {
    const router = useRouter();
    const [csrfToken, setCsrfToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getCsrfToken = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        };
        getCsrfToken();
    }, []);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                },
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = '/profile';
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Something went wrong.');
            }
        } catch (error) {
            
            setErrorMessage('Network error. Please try again later.');
            console.error(error);
            console.log(errorMessage);
        }
    };

    return (
        <div className={styles.container}>
        <div className={styles.formcontainer}>
<h2 className='text-white'>REGISTER</h2>

<div className={styles.githubLink}> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19V17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26V19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z" fill="#B3B3B3"/>
</svg>
<p>continue with github </p></div>
        <form className='flex flex-col gap-6'  onSubmit={handleSubmit}>
            <div className='flex flex-col'>
                <label className={styles.label} htmlFor="username">Username</label>
                <input
                className={styles.input}
                   placeholder='username'
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='flex flex-col'>
            <label className={styles.label} htmlFor="password">Password</label>
                <input 
                    className={styles.input}
                placeholder='password'
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type="hidden" name="_csrf" value={csrfToken} />

            <button className='m-auto mt-5 border bg-white text-black w-full py-3' type="submit">Login</button>
   
       
   </form> 
   <div className='w-full h-10 text-center'>
       {errorMessage && <p className='m-auto ' style={{ color: 'red' }}>{errorMessage}</p>}
   </div>
   <p className='mt-0 text-sm'>already have an account? <a className='underline cursor-pointer'>login</a></p>
        </div>
        </div>
    );
};

export default LoginForm;
