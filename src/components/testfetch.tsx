'use client'
import React, { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
console.log(token)
      // Fetch all users
      try {
        const response = await fetch('http://localhost:8080/users/allusers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
         <p>user</p> 
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
