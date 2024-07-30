'use client'
import { fetchCsrfToken, fetchCurrentUser, changeProfile, uploadImage, createPerson } from "@/app/utils/api";
import DefaultBtn from "@/components/buttons/defaultBtn";
import Settingsform from "@/components/form/settingsform";
import { arapey } from "../fonts";
import Login from "@/components/security/login";
import styles from './profile.module.css'
import Image from "next/image";
import { use, useEffect, useState } from "react";
import FormComp from "@/components/form/form";

interface User {
    username: string;
    email?: string;
    imageData: string;
}

const Profile = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState("");
    const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(imageData ? `data:image/jpeg;base64,${imageData}` : '');
    const handleFileChange = (e:any) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    
        // Preview the image
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string")
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      };  
    useEffect(() => {
        const getCsrfToken = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        };
        getCsrfToken();
    }, []);

    useEffect(() => {
        const getCurrentUser = async () => {
            const data = await fetchCurrentUser();
            setUser(data);
            setUsername(data.username);
            setImageData(data.imageData);
        };
        getCurrentUser();
    }, []);

    const handleChangeProfile = async (event:any) => {
        event.preventDefault();
        try {
            const data = await changeProfile(csrfToken, username);
            setUser(data);
            setUsername(data.username);
        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };

    const onImageChange = (event:any) => {
        if (event.target.files && event.target.files[0]) {
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     if (typeof reader.result === "string")
            //        setImageData(reader.result.split(",")[1]); // This is the base64 data
            // };
            // reader.readAsDataURL(event.target.files[0]);
            // setImageData()
        }
    };

    const handleUploadImage = async (event:any) => {
        event.preventDefault();
        try {
            const data = await uploadImage(selectedFile, csrfToken);
            console.log('Image upload successful:', data);
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    const createnewperson = async (event:any) => {
        event.preventDefault();
        try {
            const data = await createPerson(csrfToken);
            console.log('Image upload successful:', data);
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };    if (!user) {
        return <div className="flex flex-col items-center mt-20">
            <h2 className="uppercase">Loading...</h2>
        </div>
    }
   

    return (
        <div className="flex flex-col items-center mt-20">
            <h2  className={`mb-2 uppercase ${arapey.className}`}>WELCOME {user.username}!</h2>
            <h3  className={`mb-10 ${arapey.className}`}>Gryffindor house</h3>
            {/* <form onSubmit={handleUploadImage} encType="multipart/form-data">
        <input type="hidden" name="person" />
        <div className="form-group">
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control-file"
            onChange={handleFileChange}
          />
        </div>
        {previewImage && <img className="profile-image" src={previewImage} alt="Person Image" />}
        <button type="submit" name="upload">hi</button>
      </form> */}
            <div className="w-56 h-56 mt-4 flex border rounded-full overflow-hidden items-center justify-center">
                <Image className="h-full w-full" width={200} height={200} src={`data:image/jpeg;base64,${imageData}`} alt="Profile" />
            </div>
            <input type="file" accept="image/*" onChange={onImageChange} className="filetype" />
            <div className="mt-2"><button onClick={handleUploadImage}>Change Profile Picture</button></div>

            <div className={styles.container}>
        <div className={styles.formcontainer}>
        <form className='flex flex-col gap-6'  onSubmit={handleChangeProfile}>
            <div className='flex flex-col'>
                <label className={styles.label} htmlFor="username">Username</label>
                <input
           style={{ color: 'black' }}
                className={styles.input}
                type="text"
                id="Username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                    
                />
            </div>
            <div className='flex flex-col'>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
           style={{ color: 'black' }}
                className={styles.input}
                type="text"
                id="email"
                placeholder="yrla@hotmail.com"
                value="yrla@hotmail.com"
                // onChange={(e) => setUsername(e.target.value)}
                    
                />
            </div>
  <input type="hidden" name="_csrf" value={csrfToken} />

            <button className='m-auto mt-5 border bg-white text-black w-full py-3' type="submit">Save Changes</button>
   
       
   </form> 
   <div className='w-full h-10 text-center'>
       {/* {errorMessage && <p className='m-auto ' style={{ color: 'red' }}>{errorMessage}</p>} */}
   </div>

        </div>
        </div>
        {/* <button onClick={createnewperson}>create new person</button> */}
                 </div>
    );
}

export default Profile;
