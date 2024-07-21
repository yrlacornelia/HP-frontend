'use client'
import { fetchCsrfToken, fetchCurrentUser, changeProfile, uploadImage } from "@/app/utils/api";
import DefaultBtn from "@/components/buttons/defaultBtn";
import Settingsform from "@/components/form/settingsform";
import Login from "@/components/security/login";
import Image from "next/image";
import { useEffect, useState } from "react";

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
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string")
                    setImageData(reader.result.split(",")[1]); // This is the base64 data
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleUploadImage = async () => {
        try {
            const data = await uploadImage(imageData);
            console.log('Image upload successful:', data);
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    if (!user) {
        return <div className="flex flex-col items-center mt-20">
            <h2 className="uppercase">Loading...</h2>
        </div>
    }

    return (
        <div className="flex flex-col items-center mt-20">
            <h2 className="uppercase">Edit Profile</h2>

            <div className="w-56 h-56 mt-4 flex border rounded-full overflow-hidden items-center justify-center">
                <Image className="h-full w-full" width={200} height={200} src={`data:image/jpeg;base64,${imageData}`} alt="Profile" />
            </div>
            <input type="file" onChange={onImageChange} className="filetype" />
            <div className="mt-2"><button onClick={handleUploadImage}>Change Profile Picture</button></div>
            <h4 className="mt-4">Griffyndor House</h4>

            <form className="flex flex-col mt-12 w-72" onSubmit={handleChangeProfile}>
                <label className="mb-1" htmlFor="Username">Name</label>
                <input
                    className="mb-3 rounded"
                    type="text"
                    id="Username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className="mt-4" type="submit">Update</button>
            </form>
        </div>
    );
}

export default Profile;
