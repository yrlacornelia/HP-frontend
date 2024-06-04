'use client'
import React, { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/users/allusers')  
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
         <p>helo</p> 
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
