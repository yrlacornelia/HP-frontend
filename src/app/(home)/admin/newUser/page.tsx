'use client'
import { createPerson, createUser, fetchCsrfToken } from "@/app/utils/api";
import AdminSidebar from "@/components/navigation/adminSidebar";
import { useEffect, useState } from "react";

const NewUserPage = () => {
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
    const createnewperson = async (event:any) => {
        event.preventDefault();
        try {
            const data = await createPerson(csrfToken);
            console.log('Image upload successful:', data);
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };  
    const handleCreateUser = async (event:any) => {
        event.preventDefault();
        try {
            const data = await createUser(csrfToken, username, password);
            console.log('Image upload successful:', data);
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };  
    return (    <div className="relative">
        <AdminSidebar />
        <div className="flex gap-10 flex justify-center items-center flex-col">
            <button onClick={createnewperson}>create new person</button>
            <form className='flex flex-col gap-6'  onSubmit={handleCreateUser}>
            <div className='flex flex-col'>
                <label  htmlFor="username">Username</label>
                <input
           style={{ color: 'white' }}
            
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    
                />
            </div>
            <div className='flex flex-col'>
            <label htmlFor="password">Password</label>
                <input 
                    style={{ color: 'white' }}
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            
            <input type="hidden" name="_csrf" value={csrfToken} />

            <button className='m-auto mt-5 border bg-white text-black w-full py-3' type="submit">create person</button>
   
       
   </form>
   </div> 
   
   </div>  );
}
 
export default NewUserPage;