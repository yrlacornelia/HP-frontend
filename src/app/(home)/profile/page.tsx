'use client'
import { fetchCsrfToken } from "@/app/utils/auth";
import DefaultBtn from "@/components/buttons/defaultBtn";
import Settingsform from "@/components/form/settingsform";
import Login from "@/components/security/login";
import Image from "next/image";
import { useEffect, useState } from "react";
interface User {
  username: string;
  email?: string;
  imageData:string;
}
const Profile = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
      const getCsrfToken = async () => {
          const token = await fetchCsrfToken();
          console.log(token)
          setCsrfToken(token);
      };
      getCsrfToken();
  }, []);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [imageData, setimageData] = useState<string | ArrayBuffer | null>(null); 
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
          const response = await fetch('http://localhost:8080/users/currentuser', {
              method: 'GET',
              credentials: 'include', 
          });
          
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          
          const data = await response.json(); 
          console.log(data)
          setUser(data)
          setUsername(data.username);
          setimageData(data.imageData)
          return data;
      } catch (error) {
          console.error("Failed to fetch current user:", error);
          throw error;
      }
  };
  fetchCurrentUser();
  }, []);



  const changeProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/userSettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
    
            'X-CSRF-TOKEN': csrfToken
        
        },
        body: JSON.stringify({ username }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const data = await response.json();
      setUser(data);
      setUsername(data.username);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };
  console.log(user)
  const onImageChange = (event:any) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") 
        setimageData(reader.result.split(",")[1]); // This is the base64 data
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const uploadImage = async () => {
    console.log(imageData)
    try {
        const formData = new FormData();
        formData.append('image', imageData as unknown as Blob); // Assuming imageData is a Blob or File
        
        const response = await fetch(
          "http://localhost:8080/users/uploadProfileImage",
          {
            method: "POST",

            body: formData,
          }
        );

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        console.log('Image upload successful:', data);
    } catch (error) {
        console.error('Image upload failed:', error);
    }
};

console.log(username)
  
  if (!user) {
    return <div className="flex flex-col items-center mt-20">
      <h2 className="uppercase">Loading...</h2>
    </div>
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="uppercase">edit Profile</h2>

      <div className="w-56 h-56 mt-4 flex border rounded-full overflow-hidden items-center justify-center">
        <Image className="h-full w-full" width={200} height={200}  src={`data:image/jpeg;base64,${imageData}`} alt="letter" />
      </div>
      <input type="file" onChange={onImageChange} className="filetype" />
      <div className="mt-2"><button onClick={uploadImage}>change profile picture </button></div>
      <h4 className="mt-4">Griffyndor House</h4>

<form className="flex flex-col mt-12 w-72 ">
 
 <label className="mb-1" htmlFor="Username">Name</label>
 <input className="mb-3 rounded " type="text" id="Username"      placeholder="Username"
       value={username}      onChange={(e) => setUsername(e.target.value)}/>
 
 <button className="mt-4"  onClick={changeProfile} type="submit">update</button>
 

</form>
    </div>
  );
}

export default Profile;
