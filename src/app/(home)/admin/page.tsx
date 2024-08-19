'use client'
import { deleteUser, fetchAlluserswithHouse, fetchCsrfToken } from "@/app/utils/api";
import './adminstyles.css'
import React, { useEffect, useState } from 'react';
import './adminstyles.css';
import AdminSidebar from "@/components/navigation/adminSidebar";
import Popup from "@/components/modals/popup";
import Searchbar from "@/components/form/searchbar";
import DropdownFilter from "@/components/modals/dropdownFilter";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  age: number;
  house?: {
    name: string;
  };

  name: string;
  occupation: string;
};

const AdminPage = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHouses, setSelectedHouses] = useState<string[]>([]);
  const [csrfToken, setCsrfToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  useEffect(() => {
    const getCsrfToken = async () => {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
    };
    getCsrfToken();
  }, []);
  useEffect(() => {
    const AllUsers = async () => {
      const users = await fetchAlluserswithHouse();
      console.log(users)
      setUsers(users);
    };
    AllUsers();
  }, []);
  const handleDeleteUser = async (userId: number) => {
    console.log(userId)
    try {

      const data = await deleteUser(csrfToken, userId);
      console.log('Image upload successful:', data);


    } catch (error) {
      console.error('Image upload failed:', error);
    }
    setUsers(users.filter(user => user.id !== userId));
    setIsModalOpen(false)
  };

  const searching = (e: any) => {
    console.log(e.target.value)
  }
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    const matchesSearchTerm = (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesHouse = selectedHouses.length === 0 || (user.house && selectedHouses.includes(user.house.name.toLowerCase()));
    return matchesSearchTerm && matchesHouse;
  });

console.log(users)
  return (
<div className="relative">
      <AdminSidebar />
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DropdownFilter selectedHouses={selectedHouses} setSelectedHouses={setSelectedHouses} />
        </div>

        <table className="table-fixed w-1/2 mt-20 border-white  rounded-lg bg-white text-black">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Username</th>
              {/* <th>Age</th> */}
              <th>House</th>
              {/* <th>Occupation</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <>
                <tr className=" border-2 border-blue border-opacity-20  " key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname} {user.lastname} fasfregwafds</td>
                  <td>{user.username}</td>
                  {/* <td>{user.age}</td> */}
                  <td>{user.house?.name}</td>
                  {/* <td>{user.occupation}</td> */}
                  <td>
                    <button onClick={toggleModal} >Delete</button>

                  </td>
                </tr>
                <div className={`py-2 space-y-2 ${isModalOpen ? '' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                  <div className="fixed text-black  z-10  top-0 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                  <div className="fixed  z-30 w-1/2 top-60 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center top-0 p-4 text-center sm:items-center sm:p-0">
                      <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button onClick={toggleModal} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                        <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center items-center space-x-4">
                          <button onClick={toggleModal} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            No, cancel
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                            Yes, I'm sure
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </tbody>
        </table>

      </div>
    </div>

  );
};

export default AdminPage;


// if checked i want to 