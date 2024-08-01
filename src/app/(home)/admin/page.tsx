'use client'
import { deleteUser, fetchAllusers, fetchCsrfToken } from "@/app/utils/api";
import './adminstyles.css' 
import React, { useEffect, useState } from 'react';
import './adminstyles.css';
import AdminSidebar from "@/components/navigation/adminSidebar";

type User = {
id: number;
  name: string;
  username: string;
  age: number;
  house: string;
  occupation: string;
};

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [csrfToken, setCsrfToken] = useState('');
  useEffect(() => {
    const getCsrfToken = async () => {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
    };
    getCsrfToken();
}, []);
  useEffect(() => {
    const AllUsers = async () => {
      const users = await fetchAllusers();
      console.log(users);
      setUsers(users);
    };
    AllUsers();
  }, []);
  const handleDeleteUser = async ( userId: number) => {
    console.log(userId)
    try {
    
        const data = await deleteUser(csrfToken, userId);
        console.log('Image upload successful:', data);
        setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
        console.error('Image upload failed:', error);
    }
}; 
  return (
    <div className="relative">
    <AdminSidebar />
    <div className="flex gap-10 flex justify-center items-center flex-col">
      <div className="mt-10">
        <table className="">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Age</th>
              <th>House</th>
              <th>Occupation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.age}</td>
                <td>{user.house}</td>
                <td>{user.occupation}</td>
                <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      </div>
    </div>
  );
};

export default AdminPage;
